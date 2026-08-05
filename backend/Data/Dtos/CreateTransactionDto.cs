using System.ComponentModel.DataAnnotations;
namespace Data.Dtos;

public record CreateTransactionDto (
    [Required] string Name,
    [Range(1,10)] int CategoryId,
    string Description);