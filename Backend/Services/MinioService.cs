using Backend.Dto;
using Minio;

namespace Backend.Services;

public class MinioService
{
    private readonly MinioClient _minioClient = new MinioClient()
        // .WithEndpoint("localhost:9000")
        // .WithCredentials("3mJTBzaMRuF6nRXS", "OoP4u1vJCkH1Srqjp4415rQb2sLLTg2j")
        .WithEndpoint("play.min.io")
        .WithCredentials("Q3AM3UQ867SPQQA43P2F", "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG")
        .WithSSL()
        .Build();
    
    public async Task<NewFileDto> UploadFile(string bucketName, string objectName, byte[] fileData, string contentType) {
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
            return new NewFileDto {
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
    
    private async Task<string> GetPreSignedUrl(string bucketName, string objectName) {
        // Get pre-signed URL of uploaded object
        return await _minioClient.PresignedGetObjectAsync(new PresignedGetObjectArgs()
                .WithBucket(bucketName)
                .WithObject(objectName)
                .WithExpiry(60 * 60 * 24) // 1 day
        );
    }
}