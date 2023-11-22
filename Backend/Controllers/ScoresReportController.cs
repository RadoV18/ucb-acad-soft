using Backend.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/v1/reports/scores")]
[ApiController]
public class ScoresReportController : ControllerBase
{
    private readonly Services.SubjectAndSemesterGradeService _subjectAndSemesterGradeService = new();

    [HttpGet("filters")]
    public async Task<ActionResult<ResponseDTO<List<SemesterSubjectDetailsDTO>>>> GetFilters()
    {
        try
        {
            var response = new List<SemesterSubjectDetailsDTO>();
            // Get semesters
            var semesters = await _subjectAndSemesterGradeService.GetSemestersByProfessorId(1);
            // loop through semesters
            for(int i = 0; i < semesters.Count; i++)
            {
                var careers = await _subjectAndSemesterGradeService.GetCareersBySemesterId(semesters[i].SemesterId);
                response.Add(
                    new SemesterSubjectDetailsDTO
                    {
                        SemesterId = semesters[i].SemesterId,
                        Name = semesters[i].SemesterName,
                        Careers = careers.Data
                    }
                );
            }

            return Ok(new ResponseDTO<List<SemesterSubjectDetailsDTO>>(
                data: response,
                message: null,
                successful: true
            ));
        } catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
