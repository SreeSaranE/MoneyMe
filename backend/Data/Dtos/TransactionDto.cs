namespace Data.Dtos;

public record TransactionDto(
    int Id,
    string Name,
    string Category,
    string Description
);