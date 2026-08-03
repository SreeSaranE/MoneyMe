using System.ComponentModel.DataAnnotations;

namespace API.Dtos;

public record UpdateCashDto(
    [Required] string Name,
    [Range(1,10)] int CategoryId,
    string Description);