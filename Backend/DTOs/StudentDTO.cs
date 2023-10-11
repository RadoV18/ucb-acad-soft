namespace Backend.DTOs;

public class StudentDTO
{
    public int studentId { get; set; }
    public string ci { get; set; } = default!;
    public string firstName { get; set; } = default!;
    public string lastName { get; set; } = default!;
    public string email { get; set; } = default!;
    public string major { get; set; } = default!;
    public bool IsActive { get; set; }
}