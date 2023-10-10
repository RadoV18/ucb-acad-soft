namespace Backend.DTOs;

public class VoucherDownloadDTO
{
    public string ContentType { get; set; } = null!;
    public string Filename { get; set; } = null!;
    public string VoucherUrl { get; set; } = null!;   
}
