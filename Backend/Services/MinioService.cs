using System.Data.Common;
using Backend.DTOs;
using Backend.Models;
using Minio;

namespace Backend.Services;

public class MinioService
{
    private readonly MinioClient _minioClient = new MinioClient()
        .WithEndpoint(Environment.GetEnvironmentVariable("MINIO_ENDPOINT"))
        .WithCredentials(
            Environment.GetEnvironmentVariable("ACCESS_KEY"),
            Environment.GetEnvironmentVariable("SECRET_KEY")
        )
        // .WithSSL()
        .Build();
    
    public async Task<NewFileDTO> UploadFile(string bucketName, string objectName, byte[] fileData, string contentType) {
        try
        {
            // Create bucket if it doesn't exist
            var beArgs = new BucketExistsArgs()
                .WithBucket(bucketName);
            var found = await _minioClient.BucketExistsAsync(beArgs).ConfigureAwait(false);
            if (!found)
            {
                var mbArgs = new MakeBucketArgs()
                    .WithBucket(bucketName);
                await _minioClient.MakeBucketAsync(mbArgs).ConfigureAwait(false);
            }
            // Use a random name for the file to avoid collisions
            objectName  = $"{Guid.NewGuid()}.{(objectName.Split('.').LastOrDefault() ?? "")}";
            // Upload file
            await _minioClient.PutObjectAsync(new PutObjectArgs()
                .WithBucket(bucketName)
                .WithObject(objectName)
                .WithObjectSize(fileData.Length)
                .WithStreamData(new MemoryStream(fileData))
                .WithContentType(contentType)
            );
            // Get pre-signed URL
            Console.WriteLine("Successfully uploaded " + objectName );

            return new NewFileDTO {
                    BucketName = bucketName,
                    ObjectName = objectName,
                    ContentType = contentType,
                    DownloadLink = await GetPreSignedUrl(bucketName, objectName)
            };
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    public async Task<NewFileDTO> UploadMultipartFile(string bucketName, IFormFile file) {
        try
        {
            // Create bucket if it doesn't exist
            var beArgs = new BucketExistsArgs()
                .WithBucket(bucketName);
            var found = await _minioClient.BucketExistsAsync(beArgs).ConfigureAwait(false);
            if (!found)
            {
                var mbArgs = new MakeBucketArgs()
                    .WithBucket(bucketName);
                await _minioClient.MakeBucketAsync(mbArgs).ConfigureAwait(false);
            }
            // Use a random name for the file to avoid collisions
            var objectName  = $"{Guid.NewGuid()}.{(file.FileName.Split('.').LastOrDefault() ?? "")}";
            // Upload file
            await _minioClient.PutObjectAsync(new PutObjectArgs()
                .WithBucket(bucketName)
                .WithObject(objectName)
                .WithObjectSize(file.Length)
                .WithContentType(file.ContentType)
                .WithStreamData(file.OpenReadStream())
            );
            // Get pre-signed URL
            Console.WriteLine("Successfully uploaded " + objectName );

            return new NewFileDTO {
                    BucketName = bucketName,
                    ObjectName = objectName,
                    ContentType = file.ContentType,
                    DownloadLink = await GetPreSignedUrl(bucketName, objectName)
            };
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    public async Task<string> GetPreSignedUrl(string bucketName, string objectName) {
        // Get pre-signed URL of uploaded object
        return await _minioClient.PresignedGetObjectAsync(new PresignedGetObjectArgs()
                .WithBucket(bucketName)
                .WithObject(objectName)
                .WithExpiry(60 * 60 * 24) // 1 day
        );
    }
}