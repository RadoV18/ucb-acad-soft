using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class s3_object
{
    [Key]
    public int s3_object_id { get; set; }
    public string ContentType { get; set; }
    public string Bucket { get; set; }
    public string Filename { get; set; }
    public bool Status { get; set; }
}