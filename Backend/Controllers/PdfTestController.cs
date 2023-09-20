using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/pdf/test")]
[ApiController]
public class PdfTestController : ControllerBase
{
    private readonly Services.PdfTurtleService _pdfTurtleService = new Services.PdfTurtleService();

    [HttpGet("default")]
    public async Task<FileContentResult?> GetDefaultPdf()
    {
        try
        {
            // load html templates
            string footer = System.IO.File.ReadAllText("Utils/PdfTemplates/Sample/footer.html");
            string header = System.IO.File.ReadAllText("Utils/PdfTemplates/Sample/header.html");
            string body = System.IO.File.ReadAllText("Utils/PdfTemplates/Sample/index.html");

            // create model to render in html template
            var model = new {
                title = "Hello World",
                subtitle = "Test from C#",
                content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            };

            // get pdf
            byte[] pdf = await _pdfTurtleService.getPdf(footer, header, body, model);
            return File(pdf, "application/pdf", "test.pdf");
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine("\nException Caught!");
            Console.WriteLine("Message :{0} ", e.Message);
        }
        return null;
    }
}
