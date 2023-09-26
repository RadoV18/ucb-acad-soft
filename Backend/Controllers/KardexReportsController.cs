using Services.KardexService;

namespace Backend.Controllers;

using Backend.DTOs;
using Microsoft.AspNetCore.Mvc;

[Route("api/reports/kardex")]
[ApiController]
public class KardexReportsController : ControllerBase
{

    private readonly KardexService _kardexService = new KardexService();

    [HttpGet]
    public async Task<ActionResult<KardexSummaryDTO>> GetKardexReport()
    {
        try
        {
            var kardex = await _kardexService.GetMyKardex();
            var summary = await _kardexService.GetBriefKardex();
            var data = new KardexSummaryDTO(kardex.Data, summary.Data);
            var response = new ResponseDTO<KardexSummaryDTO>(data, null, true);
            return Ok(data);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
