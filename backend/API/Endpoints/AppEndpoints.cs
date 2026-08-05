using Data.Models;
using Data.Dtos;
using Data.DbContext;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Endpoints;

public static class AppEndpoints
{
    private const string GetCashEndpoint = "GetTransaction";

    public static void MapCashEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("cash");
        
        group.MapGet("/", () => "Welcome to MoneyMe");

        group.MapGet("/transactions", async (ITransactionRepository repository) =>
            await repository.GetAllTransaction());

        //---------------------------
        group.MapGet("/transaction/{transactionId}", async (int transactionId, ITransactionRepository repository) =>
        {
            var transaition = await repository.GetTransactionById(transactionId);
            
            return transaition is null ? Results.NotFound() : Results.Ok(transaition);
        }).WithName(GetCashEndpoint);
        
        //---------------------------
        group.MapPost("/add", async (CreateCashDto newTransaction, ITransactionRepository repository) =>
        {
            var addResult = await repository.AddTransaction(newTransaction);
            
            return Results.CreatedAtRoute(
                GetCashEndpoint,
                new { transactionId = addResult.Id },
                addResult);
        });

        //---------------------------
        group.MapPut("/update/{transactionId}", async (int transactionId, UpdateCashDto updateCash, ITransactionRepository repository) =>
        {
            var updateResult = await repository.UpdateTransaction(transactionId,  updateCash);
            
            if (updateResult == false) return Results.NotFound();
            return Results.Ok("Updated Cash");
        });

        //---------------------------
        group.MapPut("/delete/{id}", async (int id, ITransactionRepository repository) =>
        {
            await repository.DeleteTransaction(id);
            return Results.Ok("Deleted Transaction");
        });
    }
}