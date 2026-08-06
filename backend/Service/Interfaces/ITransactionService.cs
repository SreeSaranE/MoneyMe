using Data.Dtos;

namespace Service.Interfaces;

public interface ITransactionService
{
    Task<List<TransactionDto>> GetAllTransaction();

    Task<TransactionDto?> GetTransactionById(int transactionId);

    Task<TransactionDto> AddTransaction(CreateTransactionDto newTransaction);

    Task<bool> UpdateTransaction(int transactionId, UpdateTransationDto updatedTransaction);
    
    Task DeleteTransaction(int transactionId);

    Task<List<TransactionDto>> GetTransactionByCategory(int categoryId);
}