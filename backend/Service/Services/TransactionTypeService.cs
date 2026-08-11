using Data.Dtos;
using Data.Interfaces;
using Service.Interfaces;

namespace Service.Services;

public class TransactionTypeService: ITransactionTypeService
{
    private readonly ITransactionTypeRepository _transactionTypeRepository;

    public TransactionTypeService(ITransactionTypeRepository transactionTypeRepository)
    {
        _transactionTypeRepository = transactionTypeRepository;
    }

    public async Task<List<TransactionTypeDto>> GetAllTransactionType()
    {
        return await _transactionTypeRepository.GetAllTransactionType();
    }

    public async Task<TransactionTypeDto?> GetTransactionTypeById(int transactionTypeId)
    {
        return await _transactionTypeRepository.GetTransactionTypeById(transactionTypeId);
    }
}