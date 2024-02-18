namespace Api.Dtos;

public class Response<T>
{
    public T Data { get; set; } = default!;
    public string Message { get; set; } = null!;
    public bool Success { get; set; }
}