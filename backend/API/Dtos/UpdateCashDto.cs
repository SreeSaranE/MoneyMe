using System.ComponentModel.DataAnnotations;

namespace API.Dtos;

public record UpdateCashDto(
    [Required] string Name,
    [Required] string Category,
    string Description);