using System.ComponentModel.DataAnnotations;
namespace API.Dtos;

public record CreateCashDto (
    [Required] string Name,
    [Required] string Category,
    string Description);