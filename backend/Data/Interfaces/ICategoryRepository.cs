using Data.Dtos;

namespace Data.Interfaces;

public interface ICategoryRepository
{
    Task<List<CategoryDto>> GetCategories();

    Task<CategoryDto?> GetCategoryById(int categoryId);

    Task<CategoryDto> AddCategory(CreateCategoryDto newCategory);

    Task<bool> UpdateCategory(int categoryId, CreateCategoryDto updatedCategory);

    Task DeleteCategory(int categoryId);
}