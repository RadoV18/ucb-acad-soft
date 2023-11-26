using Backend.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/v1/reports/scores")]
[ApiController]
public class ScoresReportController : ControllerBase
{
    private readonly Services.SubjectAndSemesterGradeService _subjectAndSemesterGradeService = new();
    private readonly Services.ScoreService _scoreService = new();

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

    [HttpGet("count")]
    public async Task<ActionResult<ApprovedRateDto>> GetScoresCount(
        [FromQuery(Name = "semesterId")] int? semesterId,
        [FromQuery(Name = "careerId")] int? careerId,
        [FromQuery(Name = "subjectId")] int? subjectId,
        [FromQuery(Name = "parallelId")] int? parallelId
    )
    {
        if(semesterId == null || careerId == null)
        {
            return await Task.FromResult<ActionResult<ApprovedRateDto>>(BadRequest("semesterId and careerId are required."));
        }

        var response = await _scoreService.GetScoresByCareerIdAndSemesterId(careerId.GetValueOrDefault(), semesterId.GetValueOrDefault());
        var result = new List<CoordDto>();
        for(int i = 1; i <= 100; i++)
        {
            result.Add(new CoordDto {x = i.ToString(), y = 0});
        }

        foreach (var subject in response.Data)
        {
            if (
                (subjectId != null && subject.SubjectId != subjectId) ||
                (parallelId != null && subject.ParallelId != parallelId)
            )
            {
                continue;
            }

            if(subject.Scores != null)
            {
                foreach (var score in subject.Scores)
                {
                    result[score - 1].y++;
                }
            }
        }

        return await Task.FromResult<ActionResult<ApprovedRateDto>>(Ok(new ApprovedRateDto
        {
            Data = result
        }));
    }

    [HttpGet("approved")]
    public async Task<ActionResult<ApprovedRateDto>> GetApprovedBySubjects(
        [FromQuery(Name = "semesterId")] int? semesterId,
        [FromQuery(Name = "careerId")] int? careerId,
        [FromQuery(Name = "subjectId")] int? subjectId,
        [FromQuery(Name = "parallelId")] int? parallelId
    )
    {   
        if(semesterId == null || careerId == null)
        {
            return await Task.FromResult<ActionResult<ApprovedRateDto>>(BadRequest("semesterId and careerId are required."));
        }

        var response = await _scoreService.GetScoresByCareerIdAndSemesterId(careerId.GetValueOrDefault(), semesterId.GetValueOrDefault());
        int approved = 0;
        int failed = 0;

        foreach (var subject in response.Data)
        {
            if (
                (subjectId != null && subject.SubjectId != subjectId) ||
                (parallelId != null && subject.ParallelId != parallelId)
            )
            {
                continue;
            }

            if(subject.Scores != null)
            {
                foreach (var score in subject.Scores)
                {
                    if(score >= 60)
                    {
                        approved++;
                    } else
                    {
                        failed++;
                    }
                }
            }
        }

        return await Task.FromResult<ActionResult<ApprovedRateDto>>(Ok(new ApprovedRateDto
        {
            Data = new List<CoordDto>
            {
                new CoordDto {x = "Habilitados", y = approved},
                new CoordDto {x = "No Habilitados", y = failed},
            }
        }));
    }
}
