namespace Backend.DTOs;

public class StudentInfoPartialDTO
{
    public int StudentId { get; set; }
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public List<ScoreDetailDTO> Scores { get; set; } = default!;
}
