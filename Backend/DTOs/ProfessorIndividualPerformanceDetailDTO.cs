namespace Backend.DTOs;

public class ProfessorIndividualPerformanceDetailDTO
{
    public SemesterDTO Semester { get; set; } = default!;
    public List<SubjectPartialDTO> Subjects { get; set; } = default!;
}