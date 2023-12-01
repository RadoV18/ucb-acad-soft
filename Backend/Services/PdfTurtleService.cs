using Backend.DTOs;
using RestSharp;

namespace Backend.Services;

public class PdfTurtleService
{
    private readonly RestClient _client = new RestClient(
        Environment.GetEnvironmentVariable("PDF_TURTLE_ENDPOINT") ??
        "http://localhost:8000/api/pdf"
    );

    public async Task<byte[]> getPdf(string footer, string header, string body, object model)
    {
        var request = new RestRequest("from/html-template/render");
        var pdfTurtleRequestDto = new PdfTurtleRequestDTO()
        {
            FooterHtmlTemplate = footer,
            HeaderHtmlTemplate = header,
            HtmlTemplate = body,
            Model = model,
            Options = new {
                landscape = false,
                pageFormat = "Letter",
                margin = new {
                    top = 25,
                    bottom = 25,
                    left = 25,
                    right = 25
                }
            },
            TemplateEngine = "golang"
        };
        request.AddJsonBody(pdfTurtleRequestDto);
        var response = await _client.PostAsync(request);
        if(response.StatusCode != System.Net.HttpStatusCode.OK || response.RawBytes == null)
        {
            throw new Exception("PdfTurtleService.getPdf: " + response.Content);
        }
        return response.RawBytes;
    }
}
