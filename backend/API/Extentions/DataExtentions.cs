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
                new Category { CategoryName = "Pocket Money", CategoryIconId = 0 },
                new Category { CategoryName = "Food", CategoryIconId = 0 },
                new Category { CategoryName = "Snacks", CategoryIconId = 0 },
                new Category { CategoryName = "Grooming", CategoryIconId = 0 },
                new Category { CategoryName = "Transport", CategoryIconId = 0 },
                new Category { CategoryName = "Salary", CategoryIconId = 0 },
                new Category { CategoryName = "Shopping", CategoryIconId = 0 },
                new Category { CategoryName = "Entertainment", CategoryIconId = 0 },
                new Category { CategoryName = "Subscriptions", CategoryIconId = 0 },
                new Category { CategoryName = "Education", CategoryIconId = 0 },
                new Category { CategoryName = "Health", CategoryIconId = 0 },
                new Category { CategoryName = "Mobile & Internet", CategoryIconId = 0 },
                new Category { CategoryName = "Bills", CategoryIconId = 0 },
                new Category { CategoryName = "Travel", CategoryIconId = 0 },
                new Category { CategoryName = "Gifts", CategoryIconId = 0 },
                new Category { CategoryName = "Sports & Fitness", CategoryIconId = 0 },
                new Category { CategoryName = "Personal Care", CategoryIconId = 0 },
                new Category { CategoryName = "Home", CategoryIconId = 0 },
                new Category { CategoryName = "Other", CategoryIconId = 0 }
            );

            db.SaveChanges();
        }

        if (!db.PaymentMethods.Any())
        {
            db.PaymentMethods.AddRange(
                new PaymentMethod { PaymentMethodName = "Cash" },
                new PaymentMethod { PaymentMethodName = "Upi" },
                new PaymentMethod { PaymentMethodName = "Bank Transfer" },
                new PaymentMethod { PaymentMethodName = "Upi Lite" }
            );
            
            db.SaveChanges();
        }

        if (!db.TransactionTypes.Any())
        {
            db.TransactionTypes.AddRange(
                new TransactionType { TransactionTypeName = "Income" },
                new TransactionType { TransactionTypeName = "Expense" },
                new TransactionType { TransactionTypeName = "Transfer" },
                new TransactionType { TransactionTypeName = "Refund" },
                new TransactionType { TransactionTypeName = "Rewards" },
                new TransactionType { TransactionTypeName = "Lent" },
                new TransactionType { TransactionTypeName = "Borrowed" },
                new TransactionType { TransactionTypeName = "Loan Repayment Received" },
                new TransactionType { TransactionTypeName = "Loan Repayment" }
            );
            
            db.SaveChanges();
        }
    }
}