using Data.Dtos;
using Data.Interfaces;
using Service.Interfaces;

namespace Service.Services;

public class CategoryService:  ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;
    
    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }
    
    public async Task<List<CategoryDto>> GetCategories()
    {
        return await _categoryRepository.GetCategories();
    }

    public async Task<CategoryDto?> GetCategoryById(int categoryId)
    {
        return await _categoryRepository.GetCategoryById(categoryId);
    }

    public async Task<CategoryDto?> AddCategory(CreateCategoryDto newCategory)
    {
        if (newCategory.CategoryName == "") return null;
        return await _categoryRepository.AddCategory(newCategory);
    }

    public async Task<bool> UpdateCategory(int categoryId, CreateCategoryDto updatedCategory)
    {
        if (updatedCategory.CategoryName == "") return false;
        return await _categoryRepository.UpdateCategory(categoryId, updatedCategory);
    }

    public async Task DeleteCategory(int categoryId)
    {
        await _categoryRepository.DeleteCategory(categoryId);
    }
}