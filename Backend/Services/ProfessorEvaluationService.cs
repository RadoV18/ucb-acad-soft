using System.Net;
using Backend.DTOs;
using Newtonsoft.Json;
using RestSharp;

namespace Backend.Services;

public class ProfessorEvaluationService {
    
    private readonly RestClient _client = new RestClient(
        Environment.GetEnvironmentVariable("MOCKOON_ENDPOINT") ??
        "http://localhost:8080/api/v1"
    );
    
    public async Task<List<ProfessorScoreDTO>> GetProfessorScoresBySemesterId(int semesterId)
    {
        var request = new RestRequest($"professors-evaluation");
        // Add headers
        request.AddHeader("Accept", "application/json");
        // request.AddHeader("Content-Type", "application/json");
        request.AddQueryParameter("semesterId", semesterId.ToString());
        
        var response = await _client.GetAsync(request);
        
        // Check response
        if (response.StatusCode == HttpStatusCode.OK && response.Content != null)
        {
            var responseDto = JsonConvert.DeserializeObject<ResponseDTO<List<ProfessorScoreDTO>>>(response.Content);
            return responseDto!.Data!;
        }
        else
        {
            throw new Exception("Error while fetching professors");
        }
    }
}