using Backend.DTOs;

namespace Backend.DTOs;

public class SemesterSubjectDetailsDTO
{
    public int SemesterId { get; set; }
    public string Name { get; set; } = null!;
    public List<CareerSubjectDetailsDTO> Careers { get; set; } = null!;
}