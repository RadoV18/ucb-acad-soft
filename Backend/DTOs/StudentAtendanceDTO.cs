namespace Backend.DTOs;

public class StudentAtendanceDTO
{ 
    public DateTime Date { get; set; }
    public List<StudentAtendanceDetailDTO> Students { get; set; } = default!;
}
