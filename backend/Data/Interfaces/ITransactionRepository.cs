using Data.Dtos;

namespace Data.Interfaces;

public interface ITransactionRepository
{
    Task<List<TransactionDto>> GetAllTransaction();

    Task<TransactionDto?> GetTransactionById(Guid transactionId);

    Task<TransactionDto> AddTransaction(CreateTransactionDto newTransaction);

    Task<bool> UpdateTransaction(Guid transactionId, UpdateTransactionDto updatedTransaction);

    Task DeleteTransaction(Guid transactionId);

    Task<List<TransactionDto>> GetTransactionByCategory(int categoryId);
}