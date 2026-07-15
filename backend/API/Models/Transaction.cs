namespace API.Models;

public class Transaction
{
    public int Id { get; set; }
    public required string Name {get; set;}
    public Category? Category {get; set;}
    public string Description {get; set;} = string.Empty;
    
    //foriegn
    public int CategoryId {get; set;}
}