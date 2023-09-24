using Backend.Dto;

namespace Backend.Controllers;

using Microsoft.AspNetCore.Mvc;

[Route("api/v1/reports/students")]
[ApiController]
public class StudentController: ControllerBase
{
    private readonly Services.StudentAndProfessorService _studentAndProfessorService = new Services.StudentAndProfessorService();

    [HttpGet("subjects/{subjectId:int}")]
    public async Task<ActionResult<ResponseDto<List<StudentInfoDto>>>> GetStudents(int subjectId, [FromQuery] int semesterId)
    {
        try
        {
            var students = await _studentAndProfessorService.GetStudentsInfoBySubjectIdAndSemesterId(subjectId, semesterId);
            return Ok(new ResponseDto<List<StudentInfoDto>>
            {
                Successful = true,
                Data = students
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}