using Data.Dtos;

namespace Service.Interfaces;

public interface ITransactionTypeService
{
    Task<List<TransactionTypeDto>> GetAllTransactionType();
    
    Task<TransactionTypeDto?> GetTransactionTypeById(int transactionTypeId);
}