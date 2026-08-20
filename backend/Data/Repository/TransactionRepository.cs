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
            .Include(t => t.TransactionType)
            .Include(p => p.PaymentMethod)
            .Select(transaction => new TransactionDto(
                transaction.TransactionId,
                transaction.MerchantName,
                transaction.Amount,
                transaction.Timestamp,
                transaction.Category!.CategoryName,
                transaction.TransactionType!.TransactionTypeName,
                transaction.PaymentMethod!.PaymentMethodName,
                transaction.Description))
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<TransactionDto?> GetTransactionById(Guid transactionId)
    {
        var transaction = await _context.Transactions
            .Include(t => t.Category)
            .Include(t => t.TransactionType)
            .Include(p => p.PaymentMethod)
            .FirstOrDefaultAsync(t => t.TransactionId == transactionId);
        
        if (transaction == null) return null;
        
        return new TransactionDto(
            transaction.TransactionId,
            transaction.MerchantName,
            transaction.Amount,
            transaction.Timestamp,
            transaction.Category!.CategoryName,
            transaction.TransactionType!.TransactionTypeName,
            transaction.PaymentMethod!.PaymentMethodName,
            transaction.Description);
    }

    public async Task<TransactionDto> AddTransaction(CreateTransactionDto newTransaction)
    {
        Transaction transaction = new()
        {
            MerchantName = newTransaction.MerchantName,
            Amount =  newTransaction.Amount,
            Timestamp = newTransaction.Timestamp,
            CategoryId = newTransaction.CategoryId,
            TransactionTypeId = newTransaction.TransactionTypeId,
            PaymentMethodId = newTransaction.PaymentMethodId,
            Description = newTransaction.Description,
        };
        
        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();

        var createdTransaction = await _context.Transactions
            .Include(t => t.Category)
            .Include(t => t.TransactionType)
            .Include(p => p.PaymentMethod)
            .Where(t => t.TransactionId == transaction.TransactionId)
            .Select(transaction => new TransactionDto(
                transaction.TransactionId,
                transaction.MerchantName,
                transaction.Amount,
                transaction.Timestamp,
                transaction.Category!.CategoryName,
                transaction.TransactionType!.TransactionTypeName,
                transaction.PaymentMethod!.PaymentMethodName,
                transaction.Description))
            .FirstAsync();

        return createdTransaction;
    }

    public async Task<bool> UpdateTransaction(Guid transactionId, UpdateTransactionDto updatedTransaction)
    {
        var existingTransaction = await _context.Transactions.FindAsync(transactionId);
        if (existingTransaction == null) return false;
        
        existingTransaction.MerchantName = updatedTransaction.MerchantName;
        existingTransaction.CategoryId = updatedTransaction.CategoryId;
        existingTransaction.Timestamp = updatedTransaction.Timestamp;
        existingTransaction.Amount = updatedTransaction.Amount;
        existingTransaction.TransactionTypeId = updatedTransaction.TransactionTypeId;
        existingTransaction.PaymentMethodId = updatedTransaction.PaymentMethodId;
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
            .Select(transaction => new TransactionDto(
                transaction.TransactionId,
                transaction.MerchantName,
                transaction.Amount,
                transaction.Timestamp,
                transaction.Category!.CategoryName,
                transaction.TransactionType!.TransactionTypeName,
                transaction.PaymentMethod!.PaymentMethodName,
                transaction.Description))
            .ToListAsync();
    }
}