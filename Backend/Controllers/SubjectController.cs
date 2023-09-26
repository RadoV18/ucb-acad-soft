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
                SubjectId = subject.SubjectId,
                Description = $"[{semesters.First(semester => semester.SemesterId == semesterId).SemesterName}] {subject.SubjectCode} {subject.SubjectName} [Par. {subject.Parallel}]"
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
            var subject = subjects.First(subject => subject.SubjectId == subjectId); // Get subject from list
            var semesters = await _subjectAndSemesterGradeService.GetSemestersByProfessorId(professorId);
            var semester = semesters.First(semester => semester.SemesterId == semesterId); // Get semester from list
            var professor = await _studentAndProfessorService.GetProfessorInfoByProfessorId(professorId);
            // Create semester subject
            var semesterSubject = new SemesterSubjectDTO
            {
                SubjectId = subject.SubjectId,
                SemesterName = semester.SemesterName,
                StartDate = semester.StartDate,
                EndDate = semester.EndDate,
                SubjectCode = subject.SubjectCode,
                SubjectName = subject.SubjectName,
                Parallel = subject.Parallel,
                Credits = subject.Credits,
                Professor = $"{professor.LastName} {professor.FirstName}"
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
}