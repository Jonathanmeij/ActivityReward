namespace Api.Dtos;

public record ProductDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public bool Processed { get; set; }
}