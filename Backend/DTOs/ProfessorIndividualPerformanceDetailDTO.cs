namespace Backend.DTOs;

public class ProfessorIndividualPerformanceDetailDTO
{
    public SimpleSemesterDTO Semester { get; set; } = default!;
    public List<SubjectPartialDTO> Subjects { get; set; } = default!;
}