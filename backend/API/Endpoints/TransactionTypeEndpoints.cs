using Service.Interfaces;

namespace API.Endpoints;

public static class TransactionTypeEndpoints
{
    public static void MapTransactionTypeEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("transactionTypes");

        group.MapGet("/", async (
            ITransactionTypeService service) =>
        {
            return await service.GetAllTransactionType();
        });

        group.MapGet("/{transactionTypeId}", async (
            int transactionTypeId,
            ITransactionTypeService service ) =>
        {
            var  transactionType = await service.GetTransactionTypeById(transactionTypeId);
            
            if (transactionType == null) return Results.NotFound();
            return Results.Ok(transactionType);
        });
    }
}