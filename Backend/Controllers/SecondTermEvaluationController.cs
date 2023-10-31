using Backend.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Backend.Controllers;

[Route("api/reports/second-term-evaluation")]
[ApiController]
public class SecondTermEvaluationController: ControllerBase
{
    private readonly SubjectAndSemesterGradeService _subjectAndSemesterGradeService = new SubjectAndSemesterGradeService();
    private readonly PdfTurtleService _pdfTurtleService = new Services.PdfTurtleService();
    private readonly MinioService _minioService = new Services.MinioService();
    
    [HttpGet("pdf")]
    public async Task<ActionResult<string>> GetSecondTermEvaluationReportPdf()
    {
        try
        {   
            var header = System.IO.File.ReadAllText("Utils/PdfTemplates/FinalScore2TReport/header.html");
            var footer = System.IO.File.ReadAllText("Utils/PdfTemplates/FinalScore2TReport/footer.html");
            var body = System.IO.File.ReadAllText("Utils/PdfTemplates/FinalScore2TReport/index.html");

            var secondTermEvaluationReport = await _subjectAndSemesterGradeService.GetSecondTermEvaluationReport(1, 1);
            // Sort by last name and then by first name
            secondTermEvaluationReport.Students.Sort((a, b) => a.LastName.CompareTo(b.LastName) == 0 ? a.FirstName.CompareTo(b.FirstName) : a.LastName.CompareTo(b.LastName));
            // Console.WriteLine(JsonConvert.SerializeObject(secondTermEvaluationReport));
            byte[] pdf = await _pdfTurtleService.getPdf(footer, header, body, secondTermEvaluationReport);

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