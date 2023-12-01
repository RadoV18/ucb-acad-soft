namespace Backend.Services;

using Backend.DTOs;
using Newtonsoft.Json;
using RestSharp;

public class EvaluatedProfessorService
{
    private readonly RestClient _client = new RestClient(
    Environment.GetEnvironmentVariable("MOCKOON_ENDPOINT") + "/evaluatedprofessors" ??
    "http://localhost:8080/api/v1/evaluatedprofessors"
);

    public async Task<List<EvaluatedProfessor>> GetEvaluatedProfessors()
    {
        var request = new RestRequest();
        var response = await _client.GetAsync(request);
        if (response.StatusCode != System.Net.HttpStatusCode.OK || response.Content == null)
        {
            throw new Exception("Error getting evaluated professors");
        }
        return JsonConvert.DeserializeObject<List<EvaluatedProfessor>>(response.Content)!;
    }
}
