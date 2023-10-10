using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

public class TDSKardexRequest
{
  
    [Key]
    public int id { get; set; }
    public int TDS_student_student_id { get; set; }
    public string reason { get; set; } = null!;
    public int s3_object_S3_object_id { get; set; }
    public string request_state { get; set; } = null!;
    public DateTime date { get; set; }
    [ForeignKey("TDS_student_student_id")]
    public TDS_student Student { get; set; } = null!;
    [ForeignKey("s3_object_S3_object_id")]
    public S3Object S3Object { get; set; } = null!;
    
    
    public class TDSKardexRequestContext : DbContext
    {
        public TDSKardexRequestContext()
        {
        }
    
        public DbSet<TDSKardexRequest> TDS_kardex_request { get; set; }
    
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection"));
        }
    }
    
}