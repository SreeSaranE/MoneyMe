using Data.Dtos;

namespace Data.Interfaces;

public interface IPaymentMethodRepository
{
    Task<List<PaymentMethodDto>> GetAllPaymentMethods();
    
    Task<PaymentMethodDto?> GetPaymentMethodById(int paymentMethodId);
}