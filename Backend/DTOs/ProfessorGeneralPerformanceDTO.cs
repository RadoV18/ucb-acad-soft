namespace Backend.DTOs;

public class ProfessorGeneralPerformanceDTO
{
    public int TotalProfessors { get; set;}
    public int TotalProfessorsWithScoresFrom0To20 { get; set; }
    public int TotalProfessorsWithScoresFrom21To40 { get; set; }
    public int TotalProfessorsWithScoresFrom41To60 { get; set; }
    public int TotalProfessorsWithScoresFrom61To80 { get; set; }
    public int TotalProfessorsWithScoresFrom81To100 { get; set; }
}
