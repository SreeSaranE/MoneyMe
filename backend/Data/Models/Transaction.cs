namespace Data.Models;

public class Transaction
{
    public Guid TransactionId { get; set; } = Guid.NewGuid();

    public required string MerchantName { get; set; }
    
    public decimal Amount { get; set; }

    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    public Category? Category { get; set; }
    
    public TransactionType? TransactionType { get; set; }
    
    public PaymentMethod? PaymentMethod { get; set; }

    public string Description { get; set; } = string.Empty;

    // Foreign Key
    public int CategoryId { get; set; }
    
    public int TransactionTypeId { get; set; }
    
    public int PaymentMethodId { get; set; }
}