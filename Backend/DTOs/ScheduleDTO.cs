namespace Backend.DTOs;

public class ScheduleDTO
{
    public int scheduleId { get; set; }
    public string start { get; set; } = default!;
    public string end { get; set; } = default!;
    public string day { get; set; } = default!;
    public string classroom { get; set; } = default!;
}