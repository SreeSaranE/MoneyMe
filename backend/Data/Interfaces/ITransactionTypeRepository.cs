using Data.Dtos;

namespace Data.Interfaces;

public interface ITransactionTypeRepository
{
    Task<List<TransactionTypeDto>> GetAllTransactionType();
    
    Task<TransactionTypeDto?> GetTransactionTypeById(int transactionTypeId);
}