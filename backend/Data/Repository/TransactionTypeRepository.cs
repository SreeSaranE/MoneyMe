using Data.DbContext;
using Data.Dtos;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Data.Repository;

public class TransactionTypeRepository: ITransactionTypeRepository
{
    private readonly CashStoreContext _context;
    
    public TransactionTypeRepository(CashStoreContext context)
    {
        _context = context;
    }

    public async Task<List<TransactionTypeDto>> GetAllTransactionType()
    {
        return await  _context.TransactionTypes
            .Select(transactionType => new TransactionTypeDto(
                transactionType.TransactionTypeId,
                transactionType.TransactionTypeName))
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<TransactionTypeDto?> GetTransactionTypeById(int transactionTypeId)
    {
        var transactionType = await _context.TransactionTypes.FindAsync(transactionTypeId);

        if (transactionType == null) return null;
        
        return new TransactionTypeDto(
            transactionType.TransactionTypeId,
            transactionType.TransactionTypeName
        );
    }
}