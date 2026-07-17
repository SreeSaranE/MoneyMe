using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public static class DataExtentions
{
    // Use to create DB on the application when it isn't available
    public static void MigrateDb(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider
            .GetRequiredService<CashStoreContext>();
        
        dbContext.Database.Migrate();
    }

    public static void AddCashStoreDb(this WebApplicationBuilder builder)
    {
        var connectionString = builder.Configuration.GetConnectionString("CashStore");
        builder.Services.AddSqlite<CashStoreContext>(
            connectionString,
            optionsAction: options => options.UseSeeding((context, _) =>
            {
                if (!context.Set<Category>().Any())
                {
                    context.Set<Category>().AddRange(
                        new Category { CategoryName = "PocketMoney"},
                        new Category { CategoryName = "Food"},
                        new Category { CategoryName = "Snacks"},
                        new Category { CategoryName = "Grooming"}
                    );
                    context.SaveChanges();
                }
            })
        );
    }
}