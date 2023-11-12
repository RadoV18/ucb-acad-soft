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
    public async Task<ActionResult<ResponseDTO<string>>> GetProfessorSchedule()
    {
        try
        {
            // load html templates
            string footer = System.IO.File.ReadAllText("Utils/PdfTemplates/ProfessorSchedule/footer.html");
            string header = System.IO.File.ReadAllText("Utils/PdfTemplates/ProfessorSchedule/header.html");
            string body = System.IO.File.ReadAllText("Utils/PdfTemplates/ProfessorSchedule/index.html");

            // get the professor's schedule
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
    
    
    [HttpGet("subjects")]
    public async Task<ActionResult<ResponseDTO<ProfessorSubjectDTO>>> GetProfessorsAndSubjectsBySemesterId(
        [FromQuery] int semesterId)
    {
        try
        {
            // Get professors sorted by last name and first name
            var professors = await _studentAndProfessorService.GetProfessorsInfoBySemesterId(semesterId);
            professors.Sort((professor1, professor2) =>
            {
                var lastNameComparison = string.Compare(professor1.lastName, professor2.lastName, StringComparison.Ordinal);
                if (lastNameComparison != 0) return lastNameComparison;
                return string.Compare(professor1.firstName, professor2.firstName, StringComparison.Ordinal);
            });
            // Get subjects by professor id
            var professorSubjects = new List<ProfessorSubjectDTO>();
            foreach (var professor in professors)
            {
                var subjects = await _subjectAndSemesterGradeService.GetSubjectsByProfessorIdAndSemesterId(professor.professorId,
                    semesterId);
                var professorSubject = new ProfessorSubjectDTO(professor, subjects);
                professorSubjects.Add(professorSubject);
            }
            return Ok(new ResponseDTO<List<ProfessorSubjectDTO>>
            (
                professorSubjects,
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