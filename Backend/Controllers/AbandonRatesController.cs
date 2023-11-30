namespace Backend.Controllers;

using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class AbandonRatesController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<AbandonRatesResponseDTO>> GetAbandonRates()
    {
        try
        {
            AbandonRatesResponseDTO abandonRates = new(GetAbandonRatesByGrades(), GetAbandonRatesByMonths(), GetAbandonRatesBySubjects());
            return Ok(abandonRates);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    private List<GraphValues> GetAbandonRatesByGrades()
    {
        List<GraphValues> list = new();
        for (int i = 0; i < 10; i++)
        {
            Random rnd = new();
            var evaluation = new GraphValues(((10 * i) + 10) + "%", rnd.Next(1, 10));
            list.Add(evaluation);
        }
        return list;
    }

    private List<GraphValues> GetAbandonRatesByMonths()
    {
        List<GraphValues> list = new();

        Random rnd = new();
        var evaluation = new GraphValues("Agosto", rnd.Next(1, 10));
        list.Add(evaluation);

        evaluation = new GraphValues("Septiembre", rnd.Next(1, 10));
        list.Add(evaluation);

        evaluation = new GraphValues("Octubre", rnd.Next(1, 10));
        list.Add(evaluation);

        evaluation = new GraphValues("Noviembre", rnd.Next(1, 10));
        list.Add(evaluation);

        return list;
    }

    private List<GraphValues> GetAbandonRatesBySubjects()
    {
        List<GraphValues> list = new();
        for (int i = 0; i < 11; i++)
        {
            Random rnd = new();
            var evaluation = new GraphValues("Materia " + i, rnd.Next(1, 10));
            list.Add(evaluation);
        }
        return list;
    }
}
