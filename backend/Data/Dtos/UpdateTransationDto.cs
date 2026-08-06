using System.ComponentModel.DataAnnotations;

namespace Data.Dtos;

public record UpdateTransationDto(
    [Required] string TransactionName,
    [Required] decimal Amount,
    [Required] DateTime Timestamp,
    [Range(1,100)] int CategoryId,
    string Description);