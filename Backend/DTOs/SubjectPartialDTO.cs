namespace Backend.DTOs;

public class SubjectPartialDTO
{
    public int SubjectId { get; set; }
    public string SubjectCode { get; set; } = default!;
    public string SubjectName { get; set; } = default!;
    public int Parallel { get; set; }
    public int Credits { get; set; }
}
