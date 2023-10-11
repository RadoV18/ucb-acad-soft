using Backend.DTOs;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[Route("api/kardex-requests")]
[ApiController]
public class KardexRequestController : ControllerBase
{

    private readonly MinioService _minioService = new MinioService();
    private readonly S3ObjectContext _db = new S3ObjectContext();
    private readonly TDSKardexRequest.TDSKardexRequestContext _dbKardexRequest = new TDSKardexRequest.TDSKardexRequestContext();
    
    [HttpPost("vouchers")]
    public async Task<ActionResult<ResponseDTO<VoucherDTO>>> UploadVoucher ([FromForm] IFormFile file, [FromForm] string reasson)
    {
        try
        {   Console.WriteLine(reasson);
              var response = await _minioService.UploadMultipartFile("voucher",file);
            // Save to database
            var s3Object = new S3Object {
                ContentType = response.ContentType,
                Bucket = response.BucketName,
                Filename = response.ObjectName,
                Status = true
            };
            _db.S3Objects.Add(s3Object);
            _db.SaveChanges();
            
            var voucher = new VoucherDTO
            {
                VoucherId = s3Object.S3ObjectId,
                ContentType = s3Object.ContentType,
                Filename =  file.FileName
            };
            
            var kardexRequestDb = new TDSKardexRequest()
            {
                TDS_student_student_id = 1,
                reason = reasson,
                s3_object_S3_object_id = voucher.VoucherId,
                request_state = "Pendiente",
                date = DateTime.Today
            };
            
            _dbKardexRequest.TDS_kardex_request.Add(kardexRequestDb);
            _dbKardexRequest.SaveChanges();
            
            return Ok(new ResponseDTO<VoucherDTO>(voucher, null, true));
        }
        catch (Exception e)
        {
            while (e.InnerException != null)
            {
                e = e.InnerException;
            }

            return BadRequest(e.Message);
        }
    }
    
    // Get voucher by voucherId
    [HttpGet("vouchers/{voucherId:int}")]
    public async Task<ActionResult<ResponseDTO<NewFileDTO>>> GetVoucher(int voucherId)
    {
        try
        {
            var s3Object = await _db.S3Objects.FindAsync(voucherId);
            if (s3Object == null) return NotFound();
            var voucher = new VoucherDTO
            {
                VoucherId = s3Object.S3ObjectId,
                ContentType = s3Object.ContentType,
                Filename = s3Object.Filename
            };
            var response = await _minioService.GetPreSignedUrl(s3Object.Bucket, s3Object.Filename);
            var voucherDownload = new VoucherDownloadDTO
            {
                ContentType = s3Object.ContentType,
                Filename = s3Object.Filename,
                VoucherUrl = response
            };
            return Ok(new ResponseDTO<VoucherDownloadDTO>(voucherDownload, null, true));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    // Get all vouchers an transform them into a KardexRequestDTO
    [HttpGet("vouchers")]
    public async Task<ActionResult<ResponseDTO<PaginationDTO<List<KardexRequestDto>>>>> GetVouchers(
        [FromQuery] int page = 0, [FromQuery] int size = 10, [FromQuery] string order = "asc", [FromQuery] string orderBy = "requestId",
        [FromQuery] string dateFrom = "", [FromQuery] string dateTo = "", [FromQuery] string requestState = ""
        )
    {   
        try
        {
            var requests = new List<TDSKardexRequest>();
            var query = _dbKardexRequest.TDS_kardex_request.AsQueryable();
            var totalElements = 0;
            // Apply date range filter

            if (dateFrom != "" && dateTo != "")
            {
                query = query.Where(e =>
                    EF.Property<DateTime>(e, "date") >= DateTime.Parse(dateFrom) &&
                    EF.Property<DateTime>(e, "date") <= DateTime.Parse(dateTo));
            }
            
            if (requestState != "")
            {
                query = query.Where(e => e.request_state == requestState);
            }
            
            if (order == "desc")
            {
                requests = await query
                    .OrderByDescending(e =>  EF.Property<object>(e, orderBy))
                    .Skip(page * size)
                    .Take(size)
                    .ToListAsync();
            }
            else
            {
                requests = await query
                    .OrderBy(e =>  EF.Property<object>(e, orderBy))
                    .Skip(page * size)
                    .Take(size)
                    .ToListAsync();
            }
            
            totalElements = await query
                .CountAsync();
            
            var vouchers = new List<KardexRequestDto>();
            for (var i = 0; i < requests.Count; i++)
            {
                var s3Object = await _db.S3Objects.FindAsync(requests[i].s3_object_S3_object_id);
                var response = await _minioService.GetPreSignedUrl(s3Object.Bucket, s3Object.Filename);
                var voucher = new KardexRequestDto
                {
                    id = requests[i].id,
                    date = requests[i].date,
                    status = requests[i].request_state,
                    detail = new KardexRequestDetailDto
                    {
                        reason = requests[i].reason,
                        image =  response,
                        deliverDate = requests[i].deliver_date
                        
                    }
                };
                vouchers.Add(voucher);
            }
            var pagination = new PaginationDTO<KardexRequestDto>
            {

                Content = vouchers,
                TotalElements = totalElements
            };
            
            return Ok(new ResponseDTO<PaginationDTO<KardexRequestDto>>(pagination, null, true));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
}
