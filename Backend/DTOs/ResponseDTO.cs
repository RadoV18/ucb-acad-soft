namespace Backend.DTOs;

public class ResponseDTO<T>
{
    public T Data { get; set; }
    public string? Message { get; set; }
    public bool Successful { get; set; }

    public ResponseDTO(T data, string? message, bool successful)
    {
        Data = data;
        Message = message;
        Successful = successful;
    }
}