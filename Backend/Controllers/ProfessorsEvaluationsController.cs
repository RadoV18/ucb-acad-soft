namespace Backend.Controllers;

using Backend.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
[ApiController]
public class ProfessorsEvaluationsController : ControllerBase
{
    private readonly List<string> _departments = new()
    {
        "Ingenieria", "Comunicacion", "Arquitectura", "Derecho", "Economia", "Ciencias Sociales", "Ciencias de la Salud", "Ciencias Politicas", "Humanidades", "Ciencias Basicas"
    };
    private readonly Services.PdfTurtleService _pdfTurtleService = new();
    private readonly Services.MinioService _minioService = new();
    private readonly EvaluatedProfessorService _evaluatedProfessorService = new();

    [HttpGet]
    public async Task<ActionResult<List<EvaluatedProfessor>>> GetProfessorsEvaluations()
    {
        try
        {
            return Ok(await GetProfessorsEvaluationsList());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("pdf")]
    public async Task<ActionResult<ResponseDTO<string>>> GetProfessorsEvaluationsPDF()
    {
        try
        {
            var header = System.IO.File.ReadAllText("Utils/PdfTemplates/ProfessorEvaluations/header.html");
            var footer = System.IO.File.ReadAllText("Utils/PdfTemplates/ProfessorEvaluations/footer.html");
            var body = System.IO.File.ReadAllText("Utils/PdfTemplates/ProfessorEvaluations/index.html");

            var model = new
            {
                data = GetProfessorsEvaluationsList()
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

    private async Task<List<EvaluatedProfessor>> GetProfessorsEvaluationsList()
    {
        return await _evaluatedProfessorService.GetEvaluatedProfessors();
    }
}
