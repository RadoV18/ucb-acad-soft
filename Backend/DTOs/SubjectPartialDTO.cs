namespace Backend.DTOs;

public class SubjectPartialDTO
{
    public int subjectId { get; set; }
    public string subjectCode { get; set; } = default!;
    public string subjectName { get; set; } = default!;
    public int parallel { get; set; }
    public int credits { get; set; }
    public List<ScheduleDTO> schedule { get; set; } = default!;
}
