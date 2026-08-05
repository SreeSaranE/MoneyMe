using Data.Dtos;

namespace Service.Interfaces;

public interface ITransactionService
{
    Task<List<CashDto>> GetAllTransaction();

    Task<CashDto?> GetTransactionById(int transactionId);

    Task<CashDto> AddTransaction(CreateCashDto newTransaction);

    Task<bool> UpdateTransaction(int transactionId, UpdateCashDto updatedTransaction);
    
    Task DeleteTransaction(int transactionId);
}