using Backend.DTOs;

namespace Backend.Controllers;

using Microsoft.AspNetCore.Mvc;

[Route("api/v1/reports/semesters")]
[ApiController]
public class SemesterController: ControllerBase
{
    private readonly Services.SubjectAndSemesterGradeService _subjectAndSemesterGradeService = new Services.SubjectAndSemesterGradeService();

    [HttpGet("professors/{professorId:int}")]
    public async Task<ActionResult<ResponseDTO<List<SimpleSemesterDTO>>>> GetSemesters(int professorId)
    {
        try
        {
            // Get semesters
            var semesters = await _subjectAndSemesterGradeService.GetSemestersByProfessorId(professorId);
            var simpleSemesters = semesters.Select(semester => new SimpleSemesterDTO
            {
                SemesterId = semester.SemesterId,
                SemesterName = semester.SemesterName
            }).ToList();
            simpleSemesters.Sort((semester1, semester2) => semester2.SemesterId.CompareTo(semester1.SemesterId));
            
            return Ok(new ResponseDTO<List<SimpleSemesterDTO>>
            (
                simpleSemesters,
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