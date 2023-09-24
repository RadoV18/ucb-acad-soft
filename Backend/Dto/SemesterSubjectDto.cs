namespace Backend.Dto;

public class SemesterSubjectDto
{
    public int SubjectId { get; set; }
    public string SemesterName { get; set; } = default!;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string SubjectCode { get; set; } = default!;
    public string SubjectName { get; set; } = default!;
    public int Parallel { get; set; }
    public int Credits { get; set; }
    public string Professor { get; set; } = default!;
}