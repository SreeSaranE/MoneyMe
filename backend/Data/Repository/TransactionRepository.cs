using Data.DbContext;
using Data.Dtos;
using Data.Interfaces;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Repository;

public class TransactionRepository: ITransactionRepository
{
    private readonly CashStoreContext _context;

    public TransactionRepository(CashStoreContext context)
    {
        _context = context;
    }

    public async Task<List<TransactionDto>> GetAllTransaction()
    {
        return await  _context.Transactions
            .Include(t => t.Category)
            .Select(transaction => new TransactionDto(
                transaction.TransactionId,
                transaction.TransactionName,
                transaction.Amount,
                transaction.Timestamp,
                transaction.Category!.CategoryName,
                transaction.Description))
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<TransactionDto?> GetTransactionById(Guid transactionId)
    {
        var transaction = await _context.Transactions
            .Include(t => t.Category)
            .FirstOrDefaultAsync(t => t.TransactionId == transactionId);
        
        if (transaction == null) return null;
        
        return new TransactionDto(
            transaction.TransactionId,
            transaction.TransactionName,
            transaction.Amount,
            transaction.Timestamp,
            transaction.Category!.CategoryName,
            transaction.Description);
    }

    public async Task<TransactionDto> AddTransaction(CreateTransactionDto newTransaction)
    {
        Transaction transaction = new()
        {
            TransactionName = newTransaction.TransactionName,
            Amount =  newTransaction.Amount,
            Timestamp = newTransaction.Timestamp,
            CategoryId = newTransaction.CategoryId,
            Description = newTransaction.Description,
        };
        
        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();

        var createdTransaction = await _context.Transactions
            .Include(t => t.Category)
            .Where(t => t.TransactionId == transaction.TransactionId)
            .Select(t => new TransactionDto(
                t.TransactionId,
                t.TransactionName,
                t.Amount,
                t.Timestamp,
                t.Category!.CategoryName,
                t.Description))
            .FirstAsync();

        return createdTransaction;
    }

    public async Task<bool> UpdateTransaction(Guid transactionId, UpdateTransationDto updatedTransaction)
    {
        var existingTransaction = await _context.Transactions.FindAsync(transactionId);
        if (existingTransaction == null) return false;
        
        existingTransaction.TransactionName = updatedTransaction.TransactionName;
        existingTransaction.CategoryId = updatedTransaction.CategoryId;
        existingTransaction.Description = updatedTransaction.Description;
        
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task DeleteTransaction(Guid transactionId)
    {
        await _context.Transactions
            .Where(t => t.TransactionId == transactionId)
            .ExecuteDeleteAsync<Transaction>();
    }

    public async Task<List<TransactionDto>> GetTransactionByCategory(int categoryId)
    {
        return await _context.Transactions
            .Where(t => t.CategoryId == categoryId)
            .Select(t => new TransactionDto(
                t.TransactionId,
                t.TransactionName,
                t.Amount,
                t.Timestamp,
                t.Category!.CategoryName,
                t.Description
            ))
            .ToListAsync();
    }
}