using System.Net;
using Backend.DTOs;
using Newtonsoft.Json;
using RestSharp;

namespace Backend.Services;

public class SubjectAndSemesterGradeService
{
    private readonly RestClient _client = new RestClient(
        Environment.GetEnvironmentVariable("MOCKOON_ENDPOINT") ??
        "http://localhost:8080/api/v1"
    );
    
    public async Task<List<SemesterDTO>> GetSemestersByProfessorId(int professorId)
    {
        var request = new RestRequest($"semesters/professors/{professorId}");
        // Add headers
        request.AddHeader("Accept", "application/json");
        request.AddHeader("Content-Type", "application/json");
        request.AddUrlSegment("professorId", professorId.ToString());
        
        var response = await _client.GetAsync(request);

        // Check response
        if (response.StatusCode == HttpStatusCode.OK && response.Content != null)
        {
            var responseDto = JsonConvert.DeserializeObject<ResponseDTO<List<SemesterDTO>>>(response.Content);
            return responseDto!.Data!;
        }
        else
        {
            throw new Exception("Error while fetching semesters");
        }
    }
    
    public async Task<List<SubjectPartialDTO>> GetSubjectsByProfessorIdAndSemesterId(int professorId, int semesterId)
    {
        var request = new RestRequest($"subjects/professors/{professorId}");
        request.AddHeader("Accept", "application/json");
        request.AddHeader("Content-Type", "application/json");
        request.AddUrlSegment("professorId", professorId.ToString());
        request.AddQueryParameter("semesterId", semesterId.ToString());
        
        var response = await _client.GetAsync(request);

        if (response.StatusCode == HttpStatusCode.OK && response.Content != null) 
        {
            var responseDto = JsonConvert.DeserializeObject<ResponseDTO<List<SubjectPartialDTO>>>(response.Content);
            return responseDto!.Data!;
        }
        else
        {
            throw new Exception("Error while fetching subjects");
        }
    }

    public async Task<List<SubjectScheduleDTO>> GetSubjectsByStudentId(int studentId)
    {
        var request = new RestRequest($"subjects/students/{studentId}");
        request.AddHeader("Accept", "application/json");
        request.AddHeader("Content-Type", "application/json");
        
        var response = await _client.GetAsync(request);

        if (response.StatusCode == HttpStatusCode.OK && response.Content != null) 
        {
            var responseDto = JsonConvert.DeserializeObject<ResponseDTO<List<SubjectScheduleDTO>>>(response.Content);
            return responseDto!.Data!;
        }
        else
        {
            throw new Exception("Error while fetching subjects");
        }
    }
    
    public async Task<ContinuousEvaluationReportDTO> GetContinuousEvaluationReport(int subjectId, int semesterId)
    {
        var request = new RestRequest($"subjects/{subjectId}/continuous-evaluation");
        request.AddHeader("Accept", "application/json");
        request.AddHeader("Content-Type", "application/json");
        request.AddUrlSegment("subjectId", subjectId.ToString());
        request.AddQueryParameter("semesterId", semesterId.ToString());
        
        var response = await _client.GetAsync(request);

        if (response.StatusCode == HttpStatusCode.OK && response.Content != null) 
        {
            var responseDto = JsonConvert.DeserializeObject<ResponseDTO<ContinuousEvaluationReportDTO>>(response.Content);
            return responseDto!.Data!;
        }
        else
        {
            throw new Exception("Error while fetching continuous evaluation report");
        }
    }
}