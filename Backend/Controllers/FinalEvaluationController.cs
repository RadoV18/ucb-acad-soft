using Backend.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Backend.Controllers;

[Route("api/reports/final-evaluation")]
[ApiController]
public class FinalEvaluationController: ControllerBase
{
    private readonly SubjectAndSemesterGradeService _subjectAndSemesterGradeService = new SubjectAndSemesterGradeService();
    private readonly PdfTurtleService _pdfTurtleService = new Services.PdfTurtleService();
    private readonly MinioService _minioService = new Services.MinioService();
    
    [HttpGet("pdf")]
    public async Task<ActionResult<string>> GetFinalEvaluationReportPdf()
    {
        try
        {   
            var header = System.IO.File.ReadAllText("Utils/PdfTemplates/FinalScoreReport/header.html");
            var footer = System.IO.File.ReadAllText("Utils/PdfTemplates/FinalScoreReport/footer.html");
            var body = System.IO.File.ReadAllText("Utils/PdfTemplates/FinalScoreReport/index.html");

            var finalEvaluationReport = await _subjectAndSemesterGradeService.GetFinalEvaluationReport(1, 1);
            // Sort by last name and then by first name
            finalEvaluationReport.Students.Sort((a, b) => a.LastName.CompareTo(b.LastName) == 0 ? a.FirstName.CompareTo(b.FirstName) : a.LastName.CompareTo(b.LastName));
            Console.WriteLine(JsonConvert.SerializeObject(finalEvaluationReport));
            byte[] pdf = await _pdfTurtleService.getPdf(footer, header, body, finalEvaluationReport);

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