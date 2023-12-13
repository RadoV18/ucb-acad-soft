// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class SubjectPlansController : ControllerBase
    {
        // GET: api/<SubjectPlansController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<SubjectPlansController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<SubjectPlansController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<SubjectPlansController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SubjectPlansController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
