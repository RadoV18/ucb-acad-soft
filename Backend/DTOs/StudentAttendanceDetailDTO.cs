namespace Backend.DTOs;

public class StudentAttendanceDetailDTO
{
    public string Firstname { get; set; } = default!;
    public string Lastname { get; set; } = default!;
    public bool Attendance { get; set; }
}
