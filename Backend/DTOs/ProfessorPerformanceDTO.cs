namespace Backend.DTOs;

public class ProfessorPerformanceDTO
{
    public List<SubjectInfolDTO> Subjects { get; set; } = default!;
    public int TotalProfessors { get; set;}
    public int TotalProfessorsWithScoresFrom0to40 { get; set; }
    public int TotalProfessorsWithScoresFrom41to60 { get; set; }
    public int TotalProfessorsWithScoresFrom61to90 { get; set; }
    public int TotalProfessorsWithScoresFrom91to100 { get; set; }
}
