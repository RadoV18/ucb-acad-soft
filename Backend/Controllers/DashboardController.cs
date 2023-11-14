using Backend.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Backend.Controllers;

[Route("api/reports/dashboards")]
[ApiController]
public class DashboardController: ControllerBase
{
    private readonly SubjectAndSemesterGradeService _subjectAndSemesterGradeService = new SubjectAndSemesterGradeService();
    
    [HttpGet("academic-performance")]
    public async Task<ActionResult<AcademicPerformanceDTO>> GetAcademicPerformance(
        [FromQuery] List<int> subjectIds,
        [FromQuery] int semesterId
        ) 
    {
        try
        {   
            var totalStudentsWithScoresFrom0to40 = 0;
            var totalStudentsWithScoresFrom41to60 = 0;
            var totalStudentsWithScoresFrom61to90 = 0;
            var totalStudentsWithScoresFrom91to100 = 0;
            List<SubjectInfolDTO> subjects = new List<SubjectInfolDTO>();
            foreach (var subjectId in subjectIds)
            {
                if (subjectId <= 0)
                {
                    return BadRequest("Subject Ids must be greater than 0");
                }
                var finalEvaluationReport = await _subjectAndSemesterGradeService.GetFinalEvaluationReport(subjectId, semesterId);
                subjects.Add(finalEvaluationReport.Subject);
                finalEvaluationReport.Students.ForEach(student =>
                {
                    var totalScore = student.Scores.Sum(score => score.Value);
                    if (totalScore >= 0 && totalScore <= 40)
                    {
                        totalStudentsWithScoresFrom0to40++;
                    }
                    else if (totalScore > 40 && totalScore <= 60)
                    {
                        totalStudentsWithScoresFrom41to60++;
                    }
                    else if (totalScore > 60 && totalScore <= 90)
                    {
                        totalStudentsWithScoresFrom61to90++;
                    }
                    else if (totalScore > 90 && totalScore <= 100)
                    {
                        totalStudentsWithScoresFrom91to100++;
                    }
                });
            }
            
            return Ok(new ResponseDTO<AcademicPerformanceDTO>(
                new AcademicPerformanceDTO
                {
                    Subjects = subjects,
                    TotalStudents = totalStudentsWithScoresFrom0to40 + totalStudentsWithScoresFrom41to60 + totalStudentsWithScoresFrom61to90 + totalStudentsWithScoresFrom91to100,
                    TotalStudentsWithScoresFrom0to40 = totalStudentsWithScoresFrom0to40,
                    TotalStudentsWithScoresFrom41to60 = totalStudentsWithScoresFrom41to60,
                    TotalStudentsWithScoresFrom61to90 = totalStudentsWithScoresFrom61to90,
                    TotalStudentsWithScoresFrom91to100 = totalStudentsWithScoresFrom91to100
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