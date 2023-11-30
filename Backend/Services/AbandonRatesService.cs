namespace Backend.Services;

using Backend.DTOs;
using Backend.Models;
using Newtonsoft.Json;
using RestSharp;
using System.Text.Json;

public class AbandonRatesService
{
    private readonly RestClient _client = new RestClient(
        Environment.GetEnvironmentVariable("MOCKOON_ENDPOINT") + "/abandonrates" ??
        "http://localhost:8080/api/v1/abandonrates"
    );
/*    private readonly JsonSerializerOptions _options = new JsonSerializerOptions
    {
        PropertyNameCaseInsensitive = true
    };*/

    public async Task<List<GraphValues>> GetAbandonRatesByMonth()
    {
        var request = new RestRequest("/bymonths");
        var response = await _client.GetAsync(request);
        if (response.StatusCode != System.Net.HttpStatusCode.OK || response.Content == null)
        {
            throw new Exception("Error getting abandon rates by month");
        }
        return JsonConvert.DeserializeObject<List<GraphValues>>(response.Content)!;
    }

    public async Task<List<GraphValues>> GetAbandonRatesByGrades()
    {
        var request = new RestRequest("/bygrades");
        var response = await _client.GetAsync(request);
        if (response.StatusCode != System.Net.HttpStatusCode.OK || response.Content == null)
        {
            throw new Exception("Error getting abandon rates by grades");
        }
        return JsonConvert.DeserializeObject<List<GraphValues>>(response.Content)!;
    }

    public async Task<List<GraphValues>> GetAbandonRatesBySubjects()
    {
        var request = new RestRequest("/bysubjects");
        var response = await _client.GetAsync(request);
        if (response.StatusCode != System.Net.HttpStatusCode.OK || response.Content == null)
        {
            throw new Exception("Error getting abandon rates by subjects");
        }
        return JsonConvert.DeserializeObject<List<GraphValues>>(response.Content)!;
    }
}
