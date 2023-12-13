namespace Backend.Controllers;

using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class SubjectPlansController : ControllerBase
{
    private readonly PlansContext _context;

    public SubjectPlansController(PlansContext context)
    {
        _context = context;
    }
    // GET: api/<SubjectPlansController>
    [HttpGet]
    public IEnumerable<SubjectPlan> Get()
    {
        return _context.SubjectPlans;
    }

    // GET api/<SubjectPlansController>/5
    [HttpGet("{id}")]
    public SubjectPlan Get(int id)
    {
        return _context.SubjectPlans.Include(c => c.SubjectPlanClasses).FirstOrDefault(x => x.Id == id);
    }

    // POST api/<SubjectPlansController>
    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    // PUT api/<SubjectPlansController>/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] SubjectPlan body)
    {
        var plan = _context.SubjectPlans.Include(c => c.SubjectPlanClasses).FirstOrDefault(x => x.Id == id);
        plan.Name = body.Name;
        plan.Code = body.Code;
        plan.Description = body.Description;
        plan.Department = body.Department;
        plan.SubjectPlanClasses = body.SubjectPlanClasses;
        _context.SaveChanges();
    }

    // DELETE api/<SubjectPlansController>/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
}
