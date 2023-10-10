namespace Backend.DTOs;

public class StudentAttendanceResumeDTO
{ 
    public String FullName { get; set; } = default!;
    public int TotalNumberOfClasses { get; set; } = default!;
    public int NumberOfAttendances { get; set; } = default!;
    public int NumberOfAbsences { get; set; } = default!;
    public double  AttendancePercentage { get; set; } = default!;
    public double AttendanceScore { get; set; } = default!;
}