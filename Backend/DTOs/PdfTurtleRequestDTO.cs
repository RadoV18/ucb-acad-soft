namespace Backend.DTOs;
public class PdfTurtleRequestDTO
{
    public string FooterHtmlTemplate { get; set; } = default!;
    public string HeaderHtmlTemplate { get; set; } = default!;
    public string HtmlTemplate { get; set; } = default!;
    public object Model { get; set; } = default!;
    public object Options { get; set; } = default!;
    public string TemplateEngine { get; set; } = default!;
}
