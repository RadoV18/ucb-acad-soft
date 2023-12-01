namespace Backend.DTOs;

public class AcademicPerformanceDTO
{
    public List<SubjectInfolDTO> Subjects { get; set; } = default!;
    public int TotalStudents { get; set; }
    public int TotalStudentsWithScoresFrom0to40 { get; set; }
    public int TotalStudentsWithScoresFrom41to60 { get; set; }
    public int TotalStudentsWithScoresFrom61to90 { get; set; }
    public int TotalStudentsWithScoresFrom91to100 { get; set; }
}
