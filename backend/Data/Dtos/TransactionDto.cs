namespace Data.Dtos;

public record TransactionDto(
    Guid TransactionId,
    string MerchantName,
    decimal Amount,
    DateTime Timestamp,
    string Category,
    string TransactionType,
    string PaymentMethod,
    string Description
);