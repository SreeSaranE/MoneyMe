using API.Data;
using API.Dtos;
using API.Models;

namespace API.Endpoints;

public static class AppEndpoints
{
    private static readonly List<CashDto> Transactions =
    [
        new (1, "Jothi", "PocketMoney", ""),
        new (2, "Elango", "PocketMoney", ""),
        new (3, "Bakery", "Snacks", ""),
        new (4, "Hotel", "Food", ""),
        new (5, "Shop", "Stationary", "")
    ];
    
    private const string GetCashEndpoint = "GetTransaction";

    public static void MapCashEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("cash");
        
        app.MapGet("/", () => "Welcome to MoneyMe");

        group.MapGet("/transactions", () => Transactions);

        app.MapGet("/transaction/{id}", (int id) =>
        {
            var trans = Transactions.Find((transactions => transactions.Id == id));
            return trans is null ? Results.NotFound() : Results.Ok(trans);
        }).WithName(GetCashEndpoint);

        app.MapPost("/add", (CreateCashDto newCash, CashStoreContext context) =>
        {
            Transaction transaction = new()
            {
                Name = newCash.Name,
                CategoryId = newCash.CategoryId,
                Description = newCash.Description
            };
            context.Add(transaction);
            context.SaveChanges();

            CashDetailsDto CashDto = new(
                transaction.Id,
                transaction.Name,
                transaction.CategoryId,
                transaction.Description
            );
            
            
            return Results.CreatedAtRoute(GetCashEndpoint, new { id = CashDto.Id }, CashDto);
        });

        app.MapPut("/update/{id}", (int id, UpdateCashDto updateCash) =>
        {
            var index = Transactions.FindIndex(t => t.Id == id);
            if (index == -1) return Results.NotFound();
    
            Transactions[index] = new CashDto(
                id,
                updateCash.Name,
                updateCash.Category,
                updateCash.Description);
    
            return Results.Ok("Updated Cash");
        });

        app.MapPut("/delete/{id}", (int id) =>
        {
            Transactions.RemoveAll(t => t.Id == id);
            return Results.Ok("Deleted Transaction");
        });
    }
}