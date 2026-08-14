using Data.Dtos;

namespace Service.Interfaces;

public interface ICategoryService
{
    Task<List<CategoryDto>> GetCategories();

    Task<CategoryDto?> GetCategoryById(int categoryId);

    Task<CategoryDto?> AddCategory(CreateCategoryDto newCategory);

    Task<bool> UpdateCategory(int categoryId, CreateCategoryDto updatedCategory);

    Task DeleteCategory(int categoryId);
}