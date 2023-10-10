using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

public class S3Object
{
    [Key]
    public int S3ObjectId { get; set; }
    public string ContentType { get; set; } = null!;
    public string Bucket { get; set; } = null!;
    public string Filename { get; set; } = null!;
    public bool Status { get; set; }
}

public class S3ObjectContext : DbContext
{
    public S3ObjectContext()
    {
    }

    public DbSet<S3Object> S3Objects { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection"));
    }
    
    
}