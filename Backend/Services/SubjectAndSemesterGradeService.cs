using System.Net;
using Backend.Dto;
using Newtonsoft.Json;
using RestSharp;

namespace Backend.Services;

public class SubjectAndSemesterGradeService
{
    private readonly RestClient _client = new RestClient("http://localhost:8080/api/v1");
    
    public async Task<List<SemesterDto>> GetSemestersByProfessorId(int professorId)
    {
        var request = new RestRequest($"semesters/professors/{professorId}");
        request.AddHeader("Accept", "application/json");
        request.AddHeader("Content-Type", "application/json");
        request.AddUrlSegment("professorId", professorId.ToString());
        
        var response = await _client.GetAsync(request);

        if (response.StatusCode == HttpStatusCode.OK && response.Content != null)
        {
            var responseDto = JsonConvert.DeserializeObject<ResponseDto<List<SemesterDto>>>(response.Content);
            return responseDto!.Data!;
        }
        else
        {
            throw new Exception("Error while fetching semesters");
        }
    }
    
    public async Task<List<SubjectDto>> GetSubjectsByProfessorIdAndSemesterId(int professorId, int semesterId)
    {
        var request = new RestRequest($"subjects/professors/{professorId}");
        request.AddHeader("Accept", "application/json");
        request.AddHeader("Content-Type", "application/json");
        request.AddUrlSegment("professorId", professorId.ToString());
        request.AddQueryParameter("semesterId", semesterId.ToString());
        
        var response = await _client.GetAsync(request);

        if (response.StatusCode == HttpStatusCode.OK && response.Content != null) 
        {
            var responseDto = JsonConvert.DeserializeObject<ResponseDto<List<SubjectDto>>>(response.Content);
            return responseDto!.Data!;
        }
        else
        {
            throw new Exception("Error while fetching subjects");
        }
    }
}