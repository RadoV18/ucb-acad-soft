namespace Backend.DTOs;

public class ProfessorIndividualPerformanceDTO
{
    public ProfessorInfoDTO Professor { get; set; } = default!;
    public ProfessorIndividualPerformanceDetailDTO Performance { get; set; } = default!;
}
