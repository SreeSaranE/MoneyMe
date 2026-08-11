using Data.DbContext;
using Data.Dtos;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Data.Repository;

public class PaymentMethodRepository: IPaymentMethodRepository
{
    private readonly CashStoreContext _context;
    
    public PaymentMethodRepository(CashStoreContext context)
    {
        _context = context;
    }

    public async Task<List<PaymentMethodDto>> GetAllPaymentMethods()
    {
        return await _context.PaymentMethods
            .Select(paymentMethod => new PaymentMethodDto(
                paymentMethod.PaymentMethodId,
                paymentMethod.PaymentMethodName))
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<PaymentMethodDto?> GetPaymentMethodById(int paymentMethodId)
    {
        var paymentMethod = await _context.PaymentMethods.FindAsync(paymentMethodId);
        
        if ( paymentMethod == null ) return  null;
        
        return new PaymentMethodDto(
            paymentMethod.PaymentMethodId,
            paymentMethod.PaymentMethodName
        );
    }
}