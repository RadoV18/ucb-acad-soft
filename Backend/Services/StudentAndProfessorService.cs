using System.Net;
using Backend.DTOs;
using Newtonsoft.Json;
using RestSharp;

namespace Backend.Services;

public class StudentAndProfessorService {
    
    private readonly RestClient _client = new RestClient(
        Environment.GetEnvironmentVariable("MOCKOON_ENDPOINT") ??
        "http://localhost:8080/api/v1"
    );
    
    public async Task<ProfessorInfoDTO> GetProfessorInfoByProfessorId(int professorId)
    {
        var request = new RestRequest($"professors/{professorId}");
        // Add headers
        request.AddHeader("Accept", "application/json");
        request.AddHeader("Content-Type", "application/json");
        request.AddUrlSegment("professorId", professorId.ToString());
        
        var response = await _client.GetAsync(request);
        
        // Check response
        if (response.StatusCode == HttpStatusCode.OK && response.Content != null)
        {
            var responseDto = JsonConvert.DeserializeObject<ResponseDTO<ProfessorInfoDTO>>(response.Content);
            return responseDto!.Data!;
        }
        else
        {
            throw new Exception("Error while fetching professors");
        }
    }
    
    public async Task<List<StudentInfoDTO>> GetStudentsInfoBySubjectIdAndSemesterId(int subjectId, int semesterId)
    {
        var request = new RestRequest($"students/subjects/{subjectId}");
        // Add headers
        request.AddHeader("Accept", "application/json");
        request.AddHeader("Content-Type", "application/json");
        request.AddUrlSegment("subjectId", subjectId.ToString());
        request.AddQueryParameter("semesterId", semesterId.ToString());
        
        var response = await _client.GetAsync(request);
        
        // Check response
        if (response.StatusCode == HttpStatusCode.OK && response.Content != null)
        {
            var responseDto = JsonConvert.DeserializeObject<ResponseDTO<List<StudentInfoDTO>>>(response.Content);
            return responseDto!.Data!;
        }
        else
        {
            throw new Exception("Error while fetching students");
        }
    }
}