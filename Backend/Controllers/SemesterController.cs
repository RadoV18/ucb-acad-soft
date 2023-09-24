using Backend.Dto;

namespace Backend.Controllers;

using Microsoft.AspNetCore.Mvc;

[Route("api/v1/reports/semesters")]
[ApiController]
public class SemesterController: ControllerBase
{
    private readonly Services.SubjectAndSemesterGradeService _subjectAndSemesterGradeService = new Services.SubjectAndSemesterGradeService();

    [HttpGet("professors/{professorId:int}")]
    public async Task<ActionResult<ResponseDto<List<SimpleSemesterDto>>>> GetSemesters(int professorId)
    {
        try
        {
            // Get semesters
            var semesters = await _subjectAndSemesterGradeService.GetSemestersByProfessorId(professorId);
            var simpleSemesters = semesters.Select(semester => new SimpleSemesterDto
            {
                SemesterId = semester.SemesterId,
                SemesterName = semester.SemesterName
            }).ToList();
            
            return Ok(new ResponseDto<List<SimpleSemesterDto>>
            {
                Successful = true,
                Data = simpleSemesters
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}