namespace Data.Dtos;

public record TransactionDto(
    Guid TransactionId,
    string TransactionName,
    decimal Amount,
    DateTime Timestamp,
    string Category,
    string Description
);