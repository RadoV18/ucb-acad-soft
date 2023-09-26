namespace Backend.DTOs;

public class NewFileDTO
{
    public string ObjectName { get; set; } = null!;
    public string BucketName { get; set; } = null!;
    public string ContentType { get; set; } = null!;
    public string DownloadLink { get; set; } = null!;
} 
