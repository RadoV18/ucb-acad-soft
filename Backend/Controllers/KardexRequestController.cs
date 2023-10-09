using Backend.DTOs;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

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
}
