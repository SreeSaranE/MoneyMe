using Data.DbContext;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class DataExtensions
{
    /// <summary>
    /// Configures the SQLite database and registers the DbContext.
    /// </summary>
    public static void AddCashStoreDb(this WebApplicationBuilder builder)
    {
        var apiRoot = builder.Environment.ContentRootPath;
        var solutionRoot = Directory.GetParent(apiRoot)!.FullName;

        var databaseFolder = Path.Combine(solutionRoot, "Database");
        Directory.CreateDirectory(databaseFolder);

        var fileName = builder.Configuration["Database:FileName"] ?? "TransactionStore.db";
        var databasePath = Path.Combine(databaseFolder, fileName);

        var connectionString = $"Data Source={databasePath}";

        builder.Services.AddDbContext<CashStoreContext>(options =>
            options.UseSqlite(connectionString));
    }

    /// <summary>
    /// Applies pending migrations and seeds the database.
    /// </summary>
    public static void MigrateDb(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        var db = scope.ServiceProvider.GetRequiredService<CashStoreContext>();

        // Apply all pending migrations
        db.Database.EnsureCreated();

        // Seed default categories
        if (!db.Categories.Any())
        {
            db.Categories.AddRange(
                new Category { CategoryName = "PocketMoney" },
                new Category { CategoryName = "Food" },
                new Category { CategoryName = "Snacks" },
                new Category { CategoryName = "Grooming" }
            );

            db.SaveChanges();
        }
    }
}