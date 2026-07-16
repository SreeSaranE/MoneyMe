using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class CashStoreContext(DbContextOptions<CashStoreContext> options):
    DbContext(options)
{
    public DbSet<Transaction> Transactions => Set<Transaction>();

    public DbSet<Category> Categories => Set<Category>();
}