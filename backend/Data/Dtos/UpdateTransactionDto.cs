using System.ComponentModel.DataAnnotations;

namespace Data.Dtos;

public record UpdateTransactionDto(
    [Required] string MerchantName,

    [Range(typeof(decimal), "0.01", "999999999999.99")]
    decimal Amount,

    DateTime Timestamp,

    [Range(1, 100)]
    int CategoryId,

    [Range(1, 100)]
    int TransactionTypeId,

    [Range(1, 100)]
    int PaymentMethodId,

    string Description
);