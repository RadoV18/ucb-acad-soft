namespace Backend.DTOs;

public class StudentAtendanceDetailDTO
{
    public string Firstname { get; set; } = default!;
    public string Lastname { get; set; } = default!;
    public bool Attendance { get; set; }
}
