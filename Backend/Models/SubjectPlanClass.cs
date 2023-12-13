using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class SubjectPlanClass
{
    public long PlanId { get; set; }

    public long Row { get; set; }

    public string Detail { get; set; } = null!;

    public virtual SubjectPlan? Plan { get; set; } = null!;
}
