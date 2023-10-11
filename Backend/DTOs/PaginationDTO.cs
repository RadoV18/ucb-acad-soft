namespace Backend.DTOs;

public class PaginationDTO<T>
{
    public List<T> Content { get; set; } = default!;
    public int TotalElements { get; set; } = 0;
}