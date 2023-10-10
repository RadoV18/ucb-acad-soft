using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class TDS_student
{
    [Key]
    public int StudentId { get; set; }
    public string Name { get; set; }
    public string Lastname { get; set; }
}
