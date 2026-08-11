using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.DbContext;

public class CashStoreContext(DbContextOptions<CashStoreContext> options):
    Microsoft.EntityFrameworkCore.DbContext(options)
{
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Transaction>()
            .Property(t => t.Amount)
            .HasPrecision(18, 2);
    }
    
    public DbSet<Transaction> Transactions => Set<Transaction>();

    public DbSet<Category> Categories => Set<Category>();
    
    public DbSet<TransactionType> TransactionTypes => Set<TransactionType>();
    
    public DbSet<PaymentMethod> PaymentMethods => Set<PaymentMethod>();
}