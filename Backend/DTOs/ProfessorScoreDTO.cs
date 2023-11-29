namespace Backend.DTOs;

public class ProfessorScoreDTO
{
    public int professorId { get; set; } = 0;
    public string ci { get; set; } = null!;
    public string firstName { get; set; } = null!;
    public string lastName { get; set; } = null!;
    public string email { get; set; } = null!;
    public List<SubjectPartialDTO> subjects { get; set; } = default!;
}
