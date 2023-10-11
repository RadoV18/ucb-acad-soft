namespace Backend.DTOs;

public class KardexRequestDto
{
    public int id { get; set; } = 0;
    public DateTime date { get; set; } = DateTime.Now;
    public String status { get; set; } = null!;
    public KardexRequestDetailDto detail { get; set; } = null!;
    
    
}