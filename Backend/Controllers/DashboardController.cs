using Backend.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Backend.Controllers;

[Route("api/reports/dashboards")]
[ApiController]
public class DashboardController : ControllerBase
{
    private readonly SubjectAndSemesterGradeService _subjectAndSemesterGradeService =
        new SubjectAndSemesterGradeService();
    private readonly ProfessorEvaluationService _professorEvaluationService = new ProfessorEvaluationService();

    [HttpGet("academic-performance")]
    public async Task<ActionResult<AcademicPerformanceDTO>> GetAcademicPerformance(
        [FromQuery] List<int> subjectIds,
        [FromQuery] int semesterId
    )
    {
        try
        {
            var totalStudentsWithScoresFrom0To40 = 0;
            var totalStudentsWithScoresFrom41To60 = 0;
            var totalStudentsWithScoresFrom61To90 = 0;
            var totalStudentsWithScoresFrom91To100 = 0;
            List<SubjectInfolDTO> subjects = new List<SubjectInfolDTO>();
            foreach (var subjectId in subjectIds)
            {
                if (subjectId <= 0)
                {
                    return BadRequest("Subject Ids must be greater than 0");
                }

                var finalEvaluationReport =
                    await _subjectAndSemesterGradeService.GetFinalEvaluationReport(subjectId, semesterId);
                subjects.Add(finalEvaluationReport.Subject);
                finalEvaluationReport.Students.ForEach(student =>
                {
                    var totalScore = student.Scores.Sum(score => score.Value);
                    if (totalScore >= 0 && totalScore <= 40)
                    {
                        totalStudentsWithScoresFrom0To40++;
                    }
                    else if (totalScore > 40 && totalScore <= 60)
                    {
                        totalStudentsWithScoresFrom41To60++;
                    }
                    else if (totalScore > 60 && totalScore <= 90)
                    {
                        totalStudentsWithScoresFrom61To90++;
                    }
                    else if (totalScore > 90 && totalScore <= 100)
                    {
                        totalStudentsWithScoresFrom91To100++;
                    }
                });
            }

            return Ok(new ResponseDTO<AcademicPerformanceDTO>(
                new AcademicPerformanceDTO
                {
                    Subjects = subjects,
                    TotalStudents = totalStudentsWithScoresFrom0To40 + totalStudentsWithScoresFrom41To60 +
                                    totalStudentsWithScoresFrom61To90 + totalStudentsWithScoresFrom91To100,
                    TotalStudentsWithScoresFrom0to40 = totalStudentsWithScoresFrom0To40,
                    TotalStudentsWithScoresFrom41to60 = totalStudentsWithScoresFrom41To60,
                    TotalStudentsWithScoresFrom61to90 = totalStudentsWithScoresFrom61To90,
                    TotalStudentsWithScoresFrom91to100 = totalStudentsWithScoresFrom91To100
                },
                null,
                true
            ));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("professor-performance")]
    public async Task<ActionResult<ProfessorPerformanceDTO>> GetProfessorPerformance(
        [FromQuery] int semesterId
    )
    {
        try
        {
            var totalProfessorsWithScoresFrom0To20 = 0;
            var totalProfessorsWithScoresFrom21To40 = 0;
            var totalProfessorsWithScoresFrom41To60 = 0;
            var totalProfessorsWithScoresFrom61To80 = 0;
            var totalProfessorsWithScoresFrom81To100 = 0;
            var professors = await _professorEvaluationService.GetProfessorScoresBySemesterId(semesterId);
            professors.ForEach(professor =>
            {
                professor.subjects.ForEach(subject =>
                {
                    var totalScore = subject.score;
                    if (totalScore >= 0 && totalScore <= 20)
                    {
                        totalProfessorsWithScoresFrom0To20++;
                    }
                    else if (totalScore > 20 && totalScore <= 40)
                    {
                        totalProfessorsWithScoresFrom21To40++;
                    }
                    else if (totalScore > 40 && totalScore <= 60)
                    {
                        totalProfessorsWithScoresFrom41To60++;
                    }
                    else if (totalScore > 60 && totalScore <= 80)
                    {
                        totalProfessorsWithScoresFrom61To80++;
                    }
                    else if (totalScore > 80 && totalScore <= 100)
                    {
                        totalProfessorsWithScoresFrom81To100++;
                    }
                });
                
            });
            
            return Ok(new ResponseDTO<ProfessorPerformanceDTO>(
                new ProfessorPerformanceDTO
                {
                    TotalProfessors = professors.Count,
                    TotalProfessorsWithScoresFrom0To20 = totalProfessorsWithScoresFrom0To20,
                    TotalProfessorsWithScoresFrom21To40 = totalProfessorsWithScoresFrom21To40,
                    TotalProfessorsWithScoresFrom41To60 = totalProfessorsWithScoresFrom41To60,
                    TotalProfessorsWithScoresFrom61To80 = totalProfessorsWithScoresFrom61To80,
                    TotalProfessorsWithScoresFrom81To100 = totalProfessorsWithScoresFrom81To100,
                },
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