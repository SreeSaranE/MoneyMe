using Data.Interfaces;


namespace API.Endpoints;

public static class CategoryEndpoints
{
    public static void MapCategoryEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("categories");

        group.MapGet("/", async (ICategoryRepository repository) =>
            {
                return await repository.GetCategories();
            }
        );
    }
}