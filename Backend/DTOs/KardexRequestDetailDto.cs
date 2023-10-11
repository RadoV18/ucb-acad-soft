using System.Runtime.InteropServices.JavaScript;

namespace Backend.DTOs;

public class KardexRequestDetailDto
{
    public String reason { get; set; } = null!;
    public String image { get; set; } = null!;
    
    public DateTime deliverDate { get; set; } = DateTime.Now;
}