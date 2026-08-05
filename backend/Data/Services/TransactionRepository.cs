using Data.DbContext;
using Data.Dtos;
using Data.Interfaces;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Services;

public class TransactionRepository: ITransactionRepository
{
    private readonly CashStoreContext _context;

    public TransactionRepository(CashStoreContext context)
    {
        _context = context;
    }

    public async Task<List<CashDto>> GetAllTransaction()
    {
        return await  _context.Transactions
            .Include(t => t.Category)
            .Select(transaction => new CashDto(
                transaction.Id,
                transaction.Name,
                transaction.Category!.CategoryName,
                transaction.Description))
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<CashDto?> GetTransactionById(int transactionId)
    {
        var transaction = await _context.Transactions
            .Include(t => t.Category)
            .FirstOrDefaultAsync(t => t.Id == transactionId);
        
        if (transaction == null) return null;
        
        return new CashDto(
            transaction.Id,
            transaction.Name,
            transaction.Category!.CategoryName,
            transaction.Description);
    }

    public async Task<CashDto> AddTransaction(CreateCashDto newTransaction)
    {
        Transaction transaction = new()
        {
            Name = newTransaction.Name,
            CategoryId = newTransaction.CategoryId,
            Description = newTransaction.Description,
        };
        
        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();

        var createdTransaction = await _context.Transactions
            .Include(t => t.Category)
            .Select(t => new CashDto(
                t.Id,
                t.Name,
                t.Category!.CategoryName,
                t.Description))
            .FirstAsync();

        return createdTransaction;
    }

    public async Task<bool> UpdateTransaction(int transactionId, UpdateCashDto updatedTransaction)
    {
        var existingTransaction = await _context.Transactions.FindAsync(transactionId);
        if (existingTransaction == null) return false;
        
        existingTransaction.Name = updatedTransaction.Name;
        existingTransaction.CategoryId = updatedTransaction.CategoryId;
        existingTransaction.Description = updatedTransaction.Description;
        
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task DeleteTransaction(int transactionId)
    {
        await _context.Transactions
            .Where(t => t.Id == transactionId)
            .ExecuteDeleteAsync<Transaction>();
    }
}