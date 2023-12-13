using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

public partial class PlansContext : DbContext
{
    public PlansContext()
    {
    }

    public PlansContext(DbContextOptions<PlansContext> options)
        : base(options)
    {
    }

    public virtual DbSet<SubjectPlan> SubjectPlans { get; set; }

    public virtual DbSet<SubjectPlanClass> SubjectPlanClasses { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlite("Data Source=.\\Database\\plans.db");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<SubjectPlan>(entity =>
        {
            entity.HasIndex(e => e.Code, "IX_SubjectPlans_code").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Code)
                .HasColumnType("TEXT (10)")
                .HasColumnName("code");
            entity.Property(e => e.Department)
                .HasColumnType("TEXT (100)")
                .HasColumnName("department");
            entity.Property(e => e.Description)
                .HasColumnType("TEXT (255)")
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasColumnType("TEXT (30)")
                .HasColumnName("name");
        });

        modelBuilder.Entity<SubjectPlanClass>(entity =>
        {
            entity.HasKey(e => new { e.PlanId, e.Row });

            entity.Property(e => e.PlanId).HasColumnName("planId");
            entity.Property(e => e.Row).HasColumnName("row");
            entity.Property(e => e.Detail)
                .HasColumnType("TEXT (255)")
                .HasColumnName("detail");

            entity.HasOne(d => d.Plan).WithMany(p => p.SubjectPlanClasses)
                .HasForeignKey(d => d.PlanId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
