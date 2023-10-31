namespace Backend.DTOs;

public class FinalEvaluationReportDTO
{
    public SubjectInfolDTO Subject { get; set; } = default!;
    public List<ScoreDTO> Scores { get; set; } = default!;
    public List<StudentInfoPartialDTO> Students { get; set; } = default!;
}
