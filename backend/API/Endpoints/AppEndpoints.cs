using Data.Models;
using Data.Dtos;
using Data.DbContext;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using Service.Interfaces;

namespace API.Endpoints;

public static class AppEndpoints
{
    private const string GetCashEndpoint = "GetTransaction";

    public static void MapCashEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("cash");
        
        group.MapGet("/", () => "Welcome to MoneyMe");

        group.MapGet("/transactions", async (ITransactionService _service) =>
            await _service.GetAllTransaction());

        //---------------------------
        group.MapGet("/transaction/{transactionId}", async (int transactionId, ITransactionService _service) =>
        {
            var transaition = await _service.GetTransactionById(transactionId);
            
            return transaition is null ? Results.NotFound() : Results.Ok(transaition);
        }).WithName(GetCashEndpoint);
        
        //---------------------------
        group.MapPost("/add", async (CreateCashDto newTransaction, ITransactionService _service) =>
        {
            var addResult = await _service.AddTransaction(newTransaction);
            
            return Results.CreatedAtRoute(
                GetCashEndpoint,
                new { transactionId = addResult.Id },
                addResult);
        });

        //---------------------------
        group.MapPut("/update/{transactionId}", async (int transactionId, UpdateCashDto updateCash, ITransactionService _service) =>
        {
            var updateResult = await _service.UpdateTransaction(transactionId,  updateCash);
            
            if (updateResult == false) return Results.NotFound();
            return Results.Ok("Updated Cash");
        });

        //---------------------------
        group.MapPut("/delete/{id}", async (int id, ITransactionService _service) =>
        {
            await _service.DeleteTransaction(id);
            return Results.Ok("Deleted Transaction");
        });
    }
}