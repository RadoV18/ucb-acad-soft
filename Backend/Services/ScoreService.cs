using System.Net;
using Backend.DTOs;
using Newtonsoft.Json;
using RestSharp;

namespace Backend.Services;

public class ScoreService
{
    private readonly RestClient _client = new RestClient(
        Environment.GetEnvironmentVariable("MOCKOON_ENDPOINT") ??
        "http://localhost:8080/api/v1"
    );

    public async Task<ResponseDTO<List<SubjectScoresDTO>>> GetScoresByCareerIdAndSemesterId(int careerId, int semesterId)
    {
        var request = new RestRequest("/scores");
        // Add headers
        request.AddHeader("Accept", "application/json");
        request.AddHeader("Content-Type", "application/json");
        request.AddQueryParameter("careerId", careerId.ToString());
        request.AddQueryParameter("semesterId", semesterId.ToString());
        
        var response = await _client.GetAsync(request);
        
        // Check response
        if (response.StatusCode == HttpStatusCode.OK && response.Content != null)
        {
            var responseDto = JsonConvert.DeserializeObject<ResponseDTO<List<SubjectScoresDTO>>>(response.Content);
            return responseDto!;
        }
        else
        {
            throw new Exception("Error while fetching scores");
        }
    }
}