namespace Backend.DTOs;

public class SubjectInfolDTO
{
    public string Name { get; set; }
    public string Professor { get; set; } = default!;
    public int Section { get; set; }
    public string Period { get; set; } = default!;
}