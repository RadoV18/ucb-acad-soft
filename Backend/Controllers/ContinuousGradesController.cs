// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Controllers
{
    using Backend.DTOs;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class ContinuousGradesController : ControllerBase
    {
        // GET: api/<ValuesController>
        [HttpGet]
        public ActionResult<SubjectContinuousEvaluationResponseDTO> Get()
        {
            SubjectContinuousEvaluationResponseDTO subjectContinuousEvaluationResponseDTO = new(
            
                new SubjectsResponseDTO("Calculo I", "MAT-101", "Ing. Juan Perez", "A", "2-2023", new List<ClassItemDTO>() { new ClassItemDTO("Monday", "07:15", "08:45", "A-101"), new ClassItemDTO("Wednesday", "09:00", "18:30", "A-104") }),
                new StudentContinuosEvaluationDTO[] { 
                    new StudentContinuosEvaluationDTO("Juan Perez", new ContinuousEvaluationDTO[] { new ContinuousEvaluationDTO("Parcial 1", 80), new ContinuousEvaluationDTO("Parcial 2", 90) }, 85),
                    new StudentContinuosEvaluationDTO("Maria Perez", new ContinuousEvaluationDTO[] { new ContinuousEvaluationDTO("Parcial 1", 81), new ContinuousEvaluationDTO("Parcial 2", 83) }, 82),
                    new StudentContinuosEvaluationDTO("Pedro Perez", new ContinuousEvaluationDTO[] { new ContinuousEvaluationDTO("Parcial 1", 90), new ContinuousEvaluationDTO("Parcial 2", 95) }, 93),                    
                })
            ;

            return subjectContinuousEvaluationResponseDTO;
        }
    }
}
