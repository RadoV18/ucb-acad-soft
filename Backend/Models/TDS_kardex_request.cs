using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

public class TDS_kardex_request
{
    [Key]
    public int Id { get; set; }
    public int s3_object_s3_object_id { get; set; }
    public int TDS_student_student_id { get; set; }
    public DateTime Date { get; set; }
    public string RequestState { get; set; }
    public string Reason { get; set; }

    [ForeignKey("TDS_student_student_id")]
    public TDS_student Student { get; set; }

    [ForeignKey("s3_object_s3_object_id")]
    public s3_object S3Object { get; set; }
    
}