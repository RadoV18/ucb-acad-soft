using Services.KardexService;

namespace Backend.Controllers;

using Backend.DTOs;
using Microsoft.AspNetCore.Mvc;

[Route("api/reports/kardex")]
[ApiController]
public class KardexReportsController : ControllerBase
{

    private readonly KardexService _kardexService = new KardexService();
    private readonly Services.StudentAndProfessorService _studentAndProfessorService =
        new Services.StudentAndProfessorService();
    private readonly Services.PdfTurtleService _pdfTurtleService = new Services.PdfTurtleService();
    private readonly Services.MinioService _minioService = new Services.MinioService();

    [HttpGet]
    public async Task<ActionResult<KardexSummaryDTO>> GetKardexReport()
    {
        try
        {
            var kardex = await _kardexService.GetMyKardex();
            var summary = await _kardexService.GetBriefKardex();
            var data = new KardexSummaryDTO(kardex.Data, summary.Data);
            var response = new ResponseDTO<KardexSummaryDTO>(data, null, true);
            return Ok(data);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("pdf")]
    public async Task<ActionResult<string>> GetKardexReportPdf()
    {
        try
        {   
            var header = System.IO.File.ReadAllText("Utils/PdfTemplates/StudentKardex/header.html");
            var footer = System.IO.File.ReadAllText("Utils/PdfTemplates/StudentKardex/footer.html");
            var body = System.IO.File.ReadAllText("Utils/PdfTemplates/StudentKardex/index.html");

            var kardex = await _kardexService.GetMyKardex();
            var student = await _studentAndProfessorService.GetStudentById(1);
            var model = new
            {
                student = student,
                kardex = new {
                    data = kardex.Data,
                }
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
