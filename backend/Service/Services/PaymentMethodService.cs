using Data.Dtos;
using Data.Interfaces;
using Service.Interfaces;

namespace Service.Services;

public class PaymentMethodService:  IPaymentMethodService
{
    private readonly IPaymentMethodRepository _paymentMethodRepository;

    public PaymentMethodService(IPaymentMethodRepository repository)
    {
        _paymentMethodRepository = repository;
    }

    public async Task<List<PaymentMethodDto>> GetAllPaymentMethods()
    {
        return await _paymentMethodRepository.GetAllPaymentMethods();
    }

    public async Task<PaymentMethodDto?> GetPaymentMethodById(int paymentMethodId)
    {
        return  await _paymentMethodRepository.GetPaymentMethodById(paymentMethodId);
    }
}