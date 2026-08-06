using Data.Dtos;
using Data.Interfaces;
using Service.Interfaces;

namespace Service.Services;

public class TransactionService: ITransactionService
{
    private readonly ITransactionRepository _transactionRepository;
    public  TransactionService(ITransactionRepository transactionRepository)
    {
        _transactionRepository = transactionRepository;
    }

    public async Task<List<TransactionDto>> GetAllTransaction()
    {
        return await _transactionRepository.GetAllTransaction();
    }

    public async Task<TransactionDto?> GetTransactionById(Guid transactionId)
    {
        return await _transactionRepository.GetTransactionById(transactionId);
    }

    public async Task<TransactionDto> AddTransaction(CreateTransactionDto newTransaction)
    {
        var createdTransaction = await _transactionRepository
            .AddTransaction(newTransaction);
        return createdTransaction;
    }

    public async Task<bool> UpdateTransaction(Guid transactionId, UpdateTransationDto updatedTransaction)
    {
        return await _transactionRepository.UpdateTransaction(transactionId, updatedTransaction);
    }

    public async Task DeleteTransaction(Guid transactionId)
    {
        await _transactionRepository.DeleteTransaction(transactionId);
    }

    public async Task<List<TransactionDto>> GetTransactionByCategory(int categoryId)
    {
        return await _transactionRepository.GetTransactionByCategory(categoryId);
    }
}