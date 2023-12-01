namespace Backend.Controllers;

using Backend.DTOs;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class StudentAveragesController : ControllerBase
{
    private readonly List<string> _undergrade = new()
    {
        "Ingenieria de Sistemas",
        "Ingenieria Civil",
        "Ingenieria Industrial",
        "Ingenieria en Telecomunicaciones",
        "Ingenieria Comercial",
        "Derecho",
        "Economia",
        "Arquitectura",
        "Ciencias Politicas",
    };
    private readonly Services.PdfTurtleService _pdfTurtleService = new();
    private readonly Services.MinioService _minioService = new();

    [HttpGet]
    public async Task<ActionResult<List<StudentAverageDTO>>> GetStudentsAverages()
    {
        try
        {
            return Ok(GetStudentsAveragesList());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    private List<StudentAverageDTO> GetStudentsAveragesList()
    {
        List<StudentAverageDTO> list = new();

        for (int i = 0; i < 10; i++)
        {
            Random rnd = new();

            var evaluation = new StudentAverageDTO(i + 1, "Estudiante " + i, _undergrade.ElementAt(rnd.Next(_undergrade.Count)), rnd.Next(1, 5), 98);

            list.Add(evaluation);
        }

        return list;
    }

    [HttpGet("pdf")]
    public async Task<ActionResult<ResponseDTO<string>>> GetStudentsAveragesPDF()
    {
        try
        {
            var header = System.IO.File.ReadAllText("Utils/PdfTemplates/StudentAverages/header.html");
            var footer = System.IO.File.ReadAllText("Utils/PdfTemplates/StudentAverages/footer.html");
            var body = System.IO.File.ReadAllText("Utils/PdfTemplates/StudentAverages/index.html");

            var model = new
            {
                data = GetStudentsAveragesList()
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
}
