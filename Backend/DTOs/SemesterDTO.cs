namespace Backend.DTOs;

public class SemesterDTO
{
    public int SemesterId { get; set; }
    public string SemesterName { get; set; } = default!;
    public int AcademicYear { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}
