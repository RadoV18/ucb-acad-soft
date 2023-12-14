namespace Backend.Models;

using System.Text.Json.Serialization;

public partial class SubjectPlanClass
{
    public long PlanId { get; set; }

    public long Row { get; set; }

    public string Detail { get; set; } = null!;
    [JsonIgnore]
    public virtual SubjectPlan? Plan { get; set; } = null!;
}
