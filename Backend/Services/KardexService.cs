using System.Text.Json;
using Backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RestSharp;

namespace Services.KardexService;

public class KardexService
{
    private readonly RestClient _client = new RestClient("http://localhost:8080/api/v1/kardex");
    private readonly JsonSerializerOptions _options = new JsonSerializerOptions
    {
        PropertyNameCaseInsensitive = true
    };

    public async Task<ResponseDTO<List<SemesterSummaryDTO>>> GetMyKardex()
    {
        var request = new RestRequest("/my-kardex");
        var response = await _client.GetAsync(request);
        if(response.StatusCode != System.Net.HttpStatusCode.OK || response.Content == null)
        {
            throw new Exception("Error getting my-kardex");
        }
        return JsonConvert.DeserializeObject<ResponseDTO<List<SemesterSummaryDTO>>>(response.Content)!;
    }

    public async Task<ResponseDTO<List<KardexBriefDTO>>> GetBriefKardex()
    {
        var request = new RestRequest("/brief");
        var response = await _client.GetAsync(request);
        if(response.StatusCode != System.Net.HttpStatusCode.OK || response.Content == null)
        {
            throw new Exception("Error getting brief");
        }
        return JsonConvert.DeserializeObject<ResponseDTO<List<KardexBriefDTO>>>(response.Content)!;
    }
}
