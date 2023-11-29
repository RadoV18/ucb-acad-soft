namespace Backend.Controllers;

using Backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
[ApiController]
public class ProfessorsEvaluationsController : ControllerBase
{
    private readonly List<string> _departments = new()
    {
        "Ingenieria", "Comunicacion", "Arquitectura", "Derecho", "Economia", "Ciencias Sociales", "Ciencias de la Salud", "Ciencias Politicas", "Humanidades", "Ciencias Basicas"
    };

    [HttpGet]
    public async Task<ActionResult<List<EvaluatedProfessor>>> GetProfessorsEvaluations()
    {
        try
        {
            return Ok(GetProfessorsEvaluationsList());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    private List<EvaluatedProfessor> GetProfessorsEvaluationsList()
    {
        List<EvaluatedProfessor> list = new ();

        for (int i = 0; i < 10; i++)
        {
            Random rnd = new ();

            var evaluation = new EvaluatedProfessor (i+1, "Docente "+i, _departments.OrderBy(x => rnd.Next()).Take(2).ToList(), rnd.Next(1, 5), 87);

            list.Add(evaluation);
        }

        return list;
    }
}
