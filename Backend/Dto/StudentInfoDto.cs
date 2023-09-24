namespace Backend.Dto;

public class StudentInfoDto
{
    public string Ci { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Major { get; set; } = null!;
    public bool IsActive { get; set; }
}
