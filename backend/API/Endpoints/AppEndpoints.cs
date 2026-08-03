using API.Data;
using API.Dtos;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Endpoints;

public static class AppEndpoints
{
    
    private const string GetCashEndpoint = "GetTransaction";

    public static void MapCashEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("cash");
        
        group.MapGet("/", () => "Welcome to MoneyMe");

        group.MapGet("/transactions", async (CashStoreContext context) =>
            await context.Transactions
                .Include(t => t.Category)
                .Select(transaction => new CashDto(
                    transaction.Id,
                    transaction.Name,
                    transaction.Category!.CategoryName,
                    transaction.Description))
                .AsNoTracking()
                .ToListAsync());

        group.MapGet("/transaction/{id}", async (int id, CashStoreContext context) =>
        {
            var transaition = await context.Transactions.FindAsync(id);
            
            return transaition is null ? Results.NotFound() : Results.Ok(new CashDetailsDto(
                transaition.Id,
                transaition.Name,
                transaition.CategoryId,
                transaition.Description
            ));
        }).WithName(GetCashEndpoint);

        group.MapPost("/add", async (CreateCashDto newCash, CashStoreContext context) =>
        {
            Transaction transaction = new()
            {
                Name = newCash.Name,
                CategoryId = newCash.CategoryId,
                Description = newCash.Description
            };
            context.Add(transaction);
            await context.SaveChangesAsync();

            CashDetailsDto CashDto = new(
                transaction.Id,
                transaction.Name,
                transaction.CategoryId,
                transaction.Description
            );

            return Results.CreatedAtRoute(GetCashEndpoint, new { id = CashDto.Id }, CashDto);
        });

        group.MapPut("/update/{id}", async (int id, UpdateCashDto updateCash, CashStoreContext context) =>
        {
            // var index = Transactions.FindIndex(t => t.Id == id);
            var existingTransaction = await context.Transactions.FindAsync(id);
            if (existingTransaction == null) return Results.NotFound();
            
            existingTransaction.Name = updateCash.Name;
            existingTransaction.CategoryId = updateCash.CategoryId;
            existingTransaction.Description = updateCash.Description;
            
            await context.SaveChangesAsync();
    
            return Results.Ok("Updated Cash");
        });

        group.MapPut("/delete/{id}", async (int id, CashStoreContext context) =>
        {
            await context.Transactions
                .Where(c => c.Id == id)
                .ExecuteDeleteAsync();
            
            return Results.Ok("Deleted Transaction");
        });
    }
}