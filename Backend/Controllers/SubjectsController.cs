// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Controllers
{
    using Backend.DTOs;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/subjects")]
    [ApiController]
    public class SubjectsController : ControllerBase
    {
        [HttpGet]
        public ActionResult<List<SubjectsResponseDTO>> Get()
        {
            ClassItemDTO classItem = new ("Monday", "07:15", "08:45", "A-101");
            ClassItemDTO classItem2 = new ("Wednesday", "17:00", "18:30", "A-104");

            ClassItemDTO classItem3 = new("Wednesday", "07:00", "09:00", "A-101");
            ClassItemDTO classItem4 = new("Friday", "07:00", "09:00", "A-102");

            SubjectsResponseDTO response = new ("Calculo I", "MAT-101", "Ing. Juan Perez", "A", "2-2023", new List<ClassItemDTO>() { classItem, classItem2 });

            SubjectsResponseDTO response2 = new("Introducción a la Programacion", "INF-100", "Ing. Rolando Vimin", "F", "2-2023", new List<ClassItemDTO>() { classItem4, classItem3 });

            List<SubjectsResponseDTO> responses = new() { response, response2 };

            return responses;
        }
    }
}
