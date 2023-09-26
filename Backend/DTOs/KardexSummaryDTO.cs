namespace Backend.DTOs;

public class KardexSummaryDTO
{
    public List<SemesterSummaryDTO>? Semesters { get; set; }
    public List<KardexBriefDTO>? Summary { get; set; }

    public KardexSummaryDTO(List<SemesterSummaryDTO>? semesters, List<KardexBriefDTO>? summary)
    {
        Semesters = semesters;
        Summary = summary;
    }
}