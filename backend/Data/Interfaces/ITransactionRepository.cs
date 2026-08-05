using Data.Dtos;

namespace Data.Interfaces;

public interface ITransactionRepository
{
    Task<List<CashDto>> GetAllTransaction();

    Task<CashDto?> GetTransactionById(int transactionId);

    Task<CashDto> AddTransaction(CreateCashDto newTransaction);

    Task<bool> UpdateTransaction(int transactionId, UpdateCashDto updatedTransaction);

    Task DeleteTransaction(int transactionId);
}