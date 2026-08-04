using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.DbContext;

public class CashStoreContext(DbContextOptions<CashStoreContext> options):
    Microsoft.EntityFrameworkCore.DbContext(options)
{
    public DbSet<Transaction> Transactions => Set<Transaction>();

    public DbSet<Category> Categories => Set<Category>();
}