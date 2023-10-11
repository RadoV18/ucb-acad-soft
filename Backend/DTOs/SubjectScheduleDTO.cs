namespace Backend.DTOs;

public class SubjectScheduleDTO
{
    public int subjectId { get; set; }
    public string name { get; set; } = default!;
    public string code { get; set; } = default!;
    public int section { get; set; }
    public string professor { get; set; } = default!;
    public List<ScheduleDTO> schedule { get; set; } = default!;
}