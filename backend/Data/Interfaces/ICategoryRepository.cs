using Data.Dtos;

namespace Data.Interfaces;

public interface ICategoryRepository
{
    Task<List<CategoryDto>> GetCategories();
}