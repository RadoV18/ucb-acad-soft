namespace Backend.Dto;

public class NewFileDto
{
    public string ObjectName { get; set; } = null!;
    public string BucketName { get; set; } = null!;
    public string ContentType { get; set; } = null!;
    public string DownloadLink { get; set; } = null!;
} 
