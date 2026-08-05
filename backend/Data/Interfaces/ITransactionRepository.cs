using Data.Dtos;

namespace Data.Interfaces;

public interface ITransactionRepository
{
    Task<List<TransactionDto>> GetAllTransaction();

    Task<TransactionDto?> GetTransactionById(int transactionId);

    Task<TransactionDto> AddTransaction(CreateTransactionDto newTransaction);

    Task<bool> UpdateTransaction(int transactionId, UpdateTransationDto updatedTransaction);

    Task DeleteTransaction(int transactionId);
}