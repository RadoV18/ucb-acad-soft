namespace Backend.DTOs;

public class SecondTermEvaluationReportDTO
{
    public SubjectInfolDTO Subject { get; set; } = default!;
    public List<ScoreDTO> Scores { get; set; } = default!;
    public List<StudentInfoPartialDTO> Students { get; set; } = default!;
}
