using Data.Dtos;

namespace Service.Interfaces;

public interface ICategoryService
{
    Task<List<CategoryDto>> GetCategories();
}