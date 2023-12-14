namespace Backend.Controllers;

using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class SubjectPlansController : ControllerBase
{
    private readonly PlansContext _context;
    private readonly Services.MinioService _minioService = new();
    private readonly Services.PdfTurtleService _pdfTurtleService = new();

    public SubjectPlansController(PlansContext context)
    {
        _context = context;
    }
    // GET: api/<SubjectPlansController>
    [HttpGet]
    public IEnumerable<SubjectPlan> Get()
    {
        return _context.SubjectPlans.Include(c => c.SubjectPlanClasses);
    }

    [HttpGet("pdf/{id}")]
    public async Task<ActionResult<ResponseDTO<string>>> GetSubjectPlansPDF(int id)
    {
        try
        {
            var header = System.IO.File.ReadAllText("Utils/PdfTemplates/SubjectPlans/header.html");
            var footer = System.IO.File.ReadAllText("Utils/PdfTemplates/SubjectPlans/footer.html");
            var body = System.IO.File.ReadAllText("Utils/PdfTemplates/SubjectPlans/index.html");

            var plan = await _context.SubjectPlans.Include(c => c.SubjectPlanClasses).FirstOrDefaultAsync(x => x.Id == id);
            var classes = await _context.SubjectPlanClasses.Where(x => x.PlanId == id).ToListAsync();
            var model = new
            {
                plan,
                classes
            };
            byte[] pdf = await _pdfTurtleService.getPdf(footer, header, body, model);
            // upload pdf to minio
            Guid guid = Guid.NewGuid();
            string fileName = $"{guid}.pdf";
            var newFileDto = await _minioService.UploadFile("pdf", fileName, pdf, "application/pdf");
            return Ok(new ResponseDTO<string>(newFileDto.DownloadLink, null, true));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
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
    public SubjectPlan Put(int id, [FromBody] SubjectPlan body)
    {
        var plan = _context.SubjectPlans.Include(c => c.SubjectPlanClasses).FirstOrDefault(x => x.Id == id);
        plan.Name = body.Name;
        plan.Code = body.Code;
        plan.Description = body.Description;
        plan.Department = body.Department;
        plan.SubjectPlanClasses = body.SubjectPlanClasses;
        _context.SaveChanges();

        return plan;
    }

    // DELETE api/<SubjectPlansController>/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
}
