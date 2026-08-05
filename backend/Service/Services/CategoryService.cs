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
}