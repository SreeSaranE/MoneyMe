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
                new Category { CategoryName = "Pocket Money" },
                new Category { CategoryName = "Food" },
                new Category { CategoryName = "Snacks" },
                new Category { CategoryName = "Grooming" },
                new Category { CategoryName = "Transport" },
                new Category { CategoryName = "Salary" },
                new Category { CategoryName = "Shopping" },
                new Category { CategoryName = "Entertainment" },
                new Category { CategoryName = "Subscriptions" },
                new Category { CategoryName = "Education" },
                new Category { CategoryName = "Health" },
                new Category { CategoryName = "Mobile & Internet" },
                new Category { CategoryName = "Bills" },
                new Category { CategoryName = "Travel" },
                new Category { CategoryName = "Gifts" },
                new Category { CategoryName = "Sports & Fitness" },
                new Category { CategoryName = "Personal Care" },
                new Category { CategoryName = "Home" },
                new Category { CategoryName = "Other" }
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