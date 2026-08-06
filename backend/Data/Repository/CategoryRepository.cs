using Data.DbContext;
using Data.Dtos;
using Data.Interfaces;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Repository;

public class CategoryRepository: ICategoryRepository
{
    private readonly CashStoreContext _context;

    public CategoryRepository(CashStoreContext context)
    {
        _context = context;
    }
    
    public async Task<List<CategoryDto>> GetCategories()
    {
        return await _context.Categories
            .Select(category => new CategoryDto(
                category.CategoryId,
                category.CategoryName))
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<CategoryDto?> GetCategoryById(int categoryId)
    {
        var category = await _context.Categories.FindAsync(categoryId);
        
        if (category == null) return null;

        return new CategoryDto(
            category.CategoryId,
            category.CategoryName
        );
    }

    public async Task<CategoryDto> AddCategory(CreateCategoryDto newCategory)
    {
        Category category = new()
        {
            CategoryName = newCategory.CategoryName
        };

        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        var createdCategory = await _context.Categories
            .Where(c => c.CategoryId == category.CategoryId)
            .Select(c => new CategoryDto(
                c.CategoryId,
                c.CategoryName))
            .FirstAsync();
        
        return createdCategory;
    }

    public async Task<bool> UpdateCategory(int categoryId, CreateCategoryDto updatedCategory)
    {
        var existingCategory = await _context.Categories.FindAsync(categoryId);

        if (existingCategory == null) return false;

        existingCategory.CategoryName = updatedCategory.CategoryName;
        
        await  _context.SaveChangesAsync();
        return true;
    }

    public async Task DeleteCategory(int categoryId)
    {
        await _context.Categories
            .Where(c => c.CategoryId == categoryId)
            .ExecuteDeleteAsync();
    }
}