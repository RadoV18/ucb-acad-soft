namespace Backend.Controllers;

using Backend.DTOs;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class StudentAveragesController : ControllerBase
{
    private readonly List<string> _undergrade = new()
    {
        "Ingenieria de Sistemas",
        "Ingenieria Civil",
        "Ingenieria Industrial",
        "Ingenieria en Telecomunicaciones",
        "Ingenieria Comercial",
        "Derecho",
        "Economia",
        "Arquitectura",
        "Ciencias Politicas",
    };

    [HttpGet]
    public async Task<ActionResult<List<StudentAverageDTO>>> GetStudentsAverages()
    {
        try
        {
            return Ok(GetStudentsAveragesList());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    private List<StudentAverageDTO> GetStudentsAveragesList()
    {
        List<StudentAverageDTO> list = new();

        for (int i = 0; i < 10; i++)
        {
            Random rnd = new();

            var evaluation = new StudentAverageDTO(i + 1, "Estudiante " + i, _undergrade.ElementAt(rnd.Next(_undergrade.Count)), rnd.Next(1, 5), 98);

            list.Add(evaluation);
        }

        return list;
    }
}
