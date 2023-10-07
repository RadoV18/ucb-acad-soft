namespace Backend.DTOs;

public class StudentAttendanceDTO
{ 
    public DateTime Date { get; set; }
    public List<StudentAttendanceDetailDTO> Students { get; set; } = default!;
}
