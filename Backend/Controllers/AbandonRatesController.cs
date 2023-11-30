namespace Backend.Controllers;

using Backend.DTOs;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class AbandonRatesController : ControllerBase
{
    private readonly AbandonRatesService _studentAndProfessorService = new AbandonRatesService();
    [HttpGet]
    public async Task<ActionResult<AbandonRatesResponseDTO>> GetAbandonRates()
    {
        try
        {
            AbandonRatesResponseDTO abandonRates = new(
                await GetAbandonRatesByGrades(), 
                await GetAbandonRatesByMonths(), 
                await GetAbandonRatesBySubjects()
            );

            return Ok(abandonRates);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    private async Task<List<GraphValues>> GetAbandonRatesByGrades()
    {
        return await _studentAndProfessorService.GetAbandonRatesByGrades();
    }

    private async Task<List<GraphValues>> GetAbandonRatesByMonths()
    {
        return await _studentAndProfessorService.GetAbandonRatesByMonth();
    }

    private async Task<List<GraphValues>> GetAbandonRatesBySubjects()
    {
        return await _studentAndProfessorService.GetAbandonRatesBySubjects();
    }
}
