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
    
    [HttpPost("vouchers")]
    public async Task<ActionResult<ResponseDTO<VoucherDTO>>> UploadVoucher ([FromForm] IFormFile file)
    {
        try
        {
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
            return Ok(new ResponseDTO<VoucherDTO>(voucher, null, true));
        }
        catch (Exception e)
        {
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
