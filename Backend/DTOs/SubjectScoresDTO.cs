namespace Backend.DTOs;

public class SubjectScoresDTO
{
    public int? SubjectId { get; set; }
    public int? ParallelId { get; set; }
    public string? SubjectName { get; set; }
    public string? SubjectCode { get; set; }
    public ScoresApprovalRateDTO? Scores { get; set; }
}