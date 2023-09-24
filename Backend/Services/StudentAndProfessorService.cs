using System.Net;
using Backend.Dto;
using Newtonsoft.Json;
using RestSharp;

namespace Backend.Services;

public class StudentAndProfessorService {
    
    private readonly RestClient _client = new RestClient("http://localhost:8080/api/v1");
    
    public async Task<ProfessorInfoDto> GetProfessorInfoByProfessorId(int professorId)
    {
        var request = new RestRequest($"professors/{professorId}");
        request.AddHeader("Accept", "application/json");
        request.AddHeader("Content-Type", "application/json");
        request.AddUrlSegment("professorId", professorId.ToString());
        
        var response = await _client.GetAsync(request);

        if (response.StatusCode == HttpStatusCode.OK && response.Content != null)
        {
            var responseDto = JsonConvert.DeserializeObject<ResponseDto<ProfessorInfoDto>>(response.Content);
            return responseDto!.Data!;
        }
        else
        {
            throw new Exception("Error while fetching professors");
        }
    }
    
    public async Task<List<StudentInfoDto>> GetStudentsInfoBySubjectIdAndSemesterId(int subjectId, int semesterId)
    {
        var request = new RestRequest($"students/subjects/{subjectId}");
        request.AddHeader("Accept", "application/json");
        request.AddHeader("Content-Type", "application/json");
        request.AddUrlSegment("subjectId", subjectId.ToString());
        request.AddQueryParameter("semesterId", semesterId.ToString());
        
        var response = await _client.GetAsync(request);

        if (response.StatusCode == HttpStatusCode.OK && response.Content != null)
        {
            var responseDto = JsonConvert.DeserializeObject<ResponseDto<List<StudentInfoDto>>>(response.Content);
            return responseDto!.Data!;
        }
        else
        {
            throw new Exception("Error while fetching students");
        }
    }
}