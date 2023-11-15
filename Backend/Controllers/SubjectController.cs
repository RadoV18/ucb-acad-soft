using Backend.DTOs;

namespace Backend.Controllers;

using Microsoft.AspNetCore.Mvc;

[Route("api/v1/reports/subjects")]
[ApiController]
public class SubjectController: ControllerBase
{
    private readonly Services.SubjectAndSemesterGradeService _subjectAndSemesterGradeService = new Services.SubjectAndSemesterGradeService();
    private readonly Services.StudentAndProfessorService _studentAndProfessorService = new Services.StudentAndProfessorService();
    [HttpGet("professors/{professorId:int}")]
    public async Task<ActionResult<ResponseDTO<List<SimpleSubjectDTO>>>> GetSubjects(int professorId, [FromQuery] int semesterId)
    {
        try
        {
            // Get subjects
            var subjects = await _subjectAndSemesterGradeService.GetSubjectsByProfessorIdAndSemesterId(professorId, semesterId);
            var semesters = await _subjectAndSemesterGradeService.GetSemestersByProfessorId(professorId);
            // Create simple subjects
            var simpleSubjects = subjects.Select(subject => new SimpleSubjectDTO
            {
                SubjectId = subject.subjectId,
                Description = $"[{semesters.First(semester => semester.SemesterId == semesterId).SemesterName}] {subject.subjectCode} {subject.subjectName} [Par. {subject.parallel}]"
            }).ToList();
            
            return Ok(new ResponseDTO<List<SimpleSubjectDTO>>
                (
                    simpleSubjects,
                    null,
                    true
                ));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("{subjectId:int}/professors/{professorId:int}")]
    public async Task<ActionResult<ResponseDTO<SemesterSubjectDTO>>> GetSemesterSubject(int subjectId,
        int professorId, [FromQuery] int semesterId)
    {
        try
        {
            // Get semester subject
            var subjects = await _subjectAndSemesterGradeService.GetSubjectsByProfessorIdAndSemesterId(professorId, semesterId);
            var subject = subjects.First(subject => subject.subjectId == subjectId); // Get subject from list
            var semesters = await _subjectAndSemesterGradeService.GetSemestersByProfessorId(professorId);
            var semester = semesters.First(semester => semester.SemesterId == semesterId); // Get semester from list
            var professor = await _studentAndProfessorService.GetProfessorInfoByProfessorId(professorId);
            // Create semester subject
            var semesterSubject = new SemesterSubjectDTO
            {
                SubjectId = subject.subjectId,
                SemesterName = semester.SemesterName,
                StartDate = semester.StartDate,
                EndDate = semester.EndDate,
                SubjectCode = subject.subjectCode,
                SubjectName = subject.subjectName,
                Parallel = subject.parallel,
                Credits = subject.credits,
                Professor = $"{professor.lastName} {professor.firstName}"
            };
            
            return Ok(new ResponseDTO<SemesterSubjectDTO>
                (
                    semesterSubject,
                    null,
                    true
                ));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("approved")]
    public Task<ActionResult<ApprovedRateDto>> GetApprovedBySubjects(
        [FromQuery(Name = "semesterId")] int? semesterId,
        [FromQuery(Name = "careerId")] int? careerId,
        [FromQuery(Name = "subjectId")] int? subjectId,
        [FromQuery(Name = "parallelId")] int? parallelId
    )
    {   
        if(semesterId == null)
        {
            return Task.FromResult<ActionResult<ApprovedRateDto>>(BadRequest("semesterId is required."));
        }
        return Task.FromResult<ActionResult<ApprovedRateDto>>(Ok(new ApprovedRateDto
        {
            Data = new List<CoordDto>
            {
                new CoordDto {x = "Habilitados", y = 50},
                new CoordDto {x = "No Habilitados", y = 60},
            }
        }));
    }
}