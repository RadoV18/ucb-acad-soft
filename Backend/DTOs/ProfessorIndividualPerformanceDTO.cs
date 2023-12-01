namespace Backend.DTOs;

public class ProfessorIndividualPerformanceDTO
{
    public ProfessorInfoDTO Professor { get; set; } = default!;
    public List<ProfessorIndividualPerformanceDetailDTO> Performance { get; set; } = default!;
}
