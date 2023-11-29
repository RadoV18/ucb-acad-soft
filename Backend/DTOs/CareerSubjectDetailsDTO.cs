namespace Backend.DTOs;

using Backend.DTOs;

public class CareerSubjectDetailsDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public List<SubjectDetailsDTO> Subjects { get; set; } = null!;

}