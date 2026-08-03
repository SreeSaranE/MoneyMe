using API.Data;
using API.Dtos;
using Microsoft.EntityFrameworkCore;

namespace API.Endpoints;

public static class CategoryEndpoints
{
    public static void MapCategoryEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("categories");

        group.MapGet("/", async (CashStoreContext context) =>
            await context.Categories
                .Select(category => new CategoryDto(
                    category.CategoryId,
                    category.CategoryName))
                .AsNoTracking()
                .ToListAsync()
        );
    }
}