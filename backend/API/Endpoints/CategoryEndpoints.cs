using Data.Dtos;
using Service.Interfaces;

namespace API.Endpoints;

public static class CategoryEndpoints
{
    private const string GetCategoryEndpoint = "GetCategory";
    
    public static void MapCategoryEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("category");

        group.MapGet("/", async (
            ICategoryService service) => 
        {
            return await service.GetCategories(); 
        });

        group.MapGet("/{categoryId}", async (
            int categoryId,
            ICategoryService service) =>
        {
            var category = await service.GetCategoryById(categoryId);

            if (category == null) return Results.NotFound();
            return Results.Ok(category);
        }).WithName(GetCategoryEndpoint);

        group.MapPost("/add", async (
            CreateCategoryDto newCategory,
            ICategoryService service) =>
        {
            var addResult = await service.AddCategory(newCategory);
            return Results.CreatedAtRoute(
                GetCategoryEndpoint,
                new { categoryId = addResult.CategoryId },
                addResult);
        });

        group.MapPut("/update/{categoryId}", async (
            int categoryId,
            CreateCategoryDto updatedCategory,
            ICategoryService service) =>
        {
            var updateStatus = await service.UpdateCategory(categoryId, updatedCategory);
            
            if (!updateStatus) return Results.NotFound();
            return Results.NoContent();
        });

        group.MapPut("/delete/{categoryId}", async (
            int categoryId,
            ICategoryService service) =>
        {
            await service.DeleteCategory(categoryId);
            return Results.NoContent();
        });
        
    }
}