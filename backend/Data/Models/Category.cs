namespace Data.Models;

public class Category
{
    public int CategoryId {get; set;}
    
    public required string CategoryName {get; set;}

    public required int CategoryIconId { get; set; }
}