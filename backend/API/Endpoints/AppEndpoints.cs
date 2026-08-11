using Data.Dtos;
using Service.Interfaces;

namespace API.Endpoints;

public static class AppEndpoints
{
    private const string GetCashEndpoint = "GetTransaction";

    public static void MapCashEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("transaction");
        
        group.MapGet("/", () => "Welcome to MoneyMe");

        group.MapGet("/transactions", async (ITransactionService service) =>
            await service.GetAllTransaction());

        //---------------------------
        group.MapGet("/{transactionId}", async (
            Guid transactionId,
            ITransactionService service) =>
        {
            var transaition = await service.GetTransactionById(transactionId);
            
            return transaition is null ? Results.NotFound() : Results.Ok(transaition);
        }).WithName(GetCashEndpoint);
        
        //---------------------------
        group.MapPost("/add", async (
            CreateTransactionDto newTransaction,
            ITransactionService service) =>
        {
            var addResult = await service.AddTransaction(newTransaction);
            
            return Results.CreatedAtRoute(
                GetCashEndpoint,
                new { transactionId = addResult.TransactionId },
                addResult);
        });

        //---------------------------
        group.MapPut("/update/{transactionId}", async (
            Guid transactionId,
            UpdateTransactionDto updateCash,
            ITransactionService service) =>
        {
            var updateResult = await service.UpdateTransaction(transactionId,  updateCash);
            
            if (updateResult == false) return Results.NotFound();
            return Results.NoContent();
        });

        //---------------------------
        group.MapPut("/delete/{transactionId}", async (
            Guid transactionId,
            ITransactionService service) =>
        {
            await service.DeleteTransaction(transactionId);
            return Results.NoContent();
        });
        
        group.MapGet("/transaction/category/{categoryId}", async (
            int categoryId,
            ITransactionService service) =>
        {
            var transactions = await service.GetTransactionByCategory(categoryId);
            
            return Results.Ok(transactions);
            // return transactions is null ? Results.NotFound() : Results.Ok(transactions);
        });
    }
}