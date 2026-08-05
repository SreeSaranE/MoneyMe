using Data.DbContext;
using Data.Dtos;
using Data.Interfaces;
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
}