namespace Backend.Models;

public partial class SubjectPlan
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string Code { get; set; } = null!;

    public string? Description { get; set; }

    public string Department { get; set; } = null!;

    public virtual ICollection<SubjectPlanClass> SubjectPlanClasses { get; set; } = new List<SubjectPlanClass>();
}
