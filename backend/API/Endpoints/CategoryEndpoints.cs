using Service.Interfaces;

namespace API.Endpoints;

public static class CategoryEndpoints
{
    public static void MapCategoryEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("categories");

        group.MapGet("/", async (ICategoryService service) =>
            {
                return await service.GetCategories();
            }
        );
    }
}