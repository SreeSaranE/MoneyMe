using Microsoft.EntityFrameworkCore;

namespace API.Data;

public static class DataExtentions
{
    public static void MigrateDb(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider
            .GetRequiredService<CashStoreContext>();
        
        dbContext.Database.Migrate();
    }
}