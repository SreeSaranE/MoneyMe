using Data.Dtos;

namespace Service.Interfaces;

public interface IPaymentMethodService
{
    Task<List<PaymentMethodDto>> GetAllPaymentMethods();
    
    Task<PaymentMethodDto?> GetPaymentMethodById(int paymentMethodId);
}