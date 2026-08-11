using Service.Interfaces;

namespace API.Endpoints;

public static class PaymentMethodEndpoints
{
    public static void MapPaymentMethodEndpoints( this WebApplication app )
    {
        var group = app.MapGroup("payment-methods");

        group.MapGet("/", async (
            IPaymentMethodService service) =>
        {
            return await service.GetAllPaymentMethods();
        });

        group.MapGet("/{paymentMethodId}", async (
            int paymentMethodId,
            IPaymentMethodService service) =>
        {
            var paymentMethod = await service.GetPaymentMethodById(paymentMethodId);

            if (paymentMethod == null) return Results.NotFound();
            return Results.Ok(paymentMethod);
        });
    }
}