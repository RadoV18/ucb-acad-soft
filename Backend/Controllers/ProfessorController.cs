using Backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Backend.Controllers;

[Route("api/v1/reports/professors")]
[ApiController]
public class ProfessorController : ControllerBase
{
    private readonly Services.StudentAndProfessorService _studentAndProfessorService =
        new Services.StudentAndProfessorService();

    private readonly Services.SubjectAndSemesterGradeService _subjectAndSemesterGradeService =
        new Services.SubjectAndSemesterGradeService();

    private readonly Services.MinioService _minioService = new Services.MinioService();

    private readonly Services.PdfTurtleService _pdfTurtleService = new Services.PdfTurtleService();
    
    [HttpGet("schedule")]
    public async Task<ActionResult<ResponseDTO<string>>> GetStudentSchedule()
    {
        try
        {
            // load html templates
            string footer = System.IO.File.ReadAllText("Utils/PdfTemplates/ProfessorSchedule/footer.html");
            string header = System.IO.File.ReadAllText("Utils/PdfTemplates/ProfessorSchedule/header.html");
            string body = System.IO.File.ReadAllText("Utils/PdfTemplates/ProfessorSchedule/index.html");

            // get the student's schedule
            var professor = await _studentAndProfessorService.GetProfessorInfoByProfessorId(1);
            var subjects = await _subjectAndSemesterGradeService.GetSubjectsByProfessorIdAndSemesterId(1, 4);
            string period = "2-2023";
            var model = new
            {
                professor = professor,
                data = subjects,
                period = period
            };

            byte[] pdf = await _pdfTurtleService.getPdf(footer, header, body, model);

            // upload pdf to minio
            Guid guid = Guid.NewGuid();
            string fileName = $"{guid}.pdf";
            var newFileDto = await _minioService.UploadFile("pdf", fileName, pdf, "application/pdf");
            return Ok(new ResponseDTO<string>
            (
                newFileDto.DownloadLink,
                null,
                true
            ));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}