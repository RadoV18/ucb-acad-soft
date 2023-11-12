namespace Backend.DTOs;

public class ProfessorInfoDTO
{
    public int professorId { get; set; } = 0;
    public string ci { get; set; } = null!;
    public string firstName { get; set; } = null!;
    public string lastName { get; set; } = null!;
    public string email { get; set; } = null!;
    public string phone { get; set; } = null!;
}
