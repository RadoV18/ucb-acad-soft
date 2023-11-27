namespace Backend.Controllers;

using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class AbandonRatesController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<AbandonRatesResponseDTO>> GetAbandonRatesBySubjectId()
    {
        try
        {
            AbandonRatesResponseDTO abandonRates = new(new List<GraphValues>(), new List<GraphValues>(), new List<GraphValues>());
            return Ok(abandonRates);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
