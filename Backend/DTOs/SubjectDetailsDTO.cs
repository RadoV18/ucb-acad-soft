namespace Backend.DTOs;

using Backend.DTOs;

public class SubjectDetailsDTO
{
    public int SubjectId { get; set; }
    public string Name { get; set; } = null!;
    public List<ParallelDTO> Parallels { get; set; } = null!;
}