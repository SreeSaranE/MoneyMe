using API.Dtos;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

List<CashDto> transactions =
[
    new (1, "Jothi", "PocketMoney"),
    new (2, "Elango", "PocketMoney"),
    new (3, "Bakery", "Snacks"),
    new (4, "Hotel", "Food"),
    new (5, "Shop", "Stationary")
];
    
const string GetCashEndpoint = "GetTransaction";

app.MapGet("/", () => "Welcome to MoneyMe");

app.MapGet("/transactions", () => transactions);

app.MapGet("/transactions/{id}", (int id) =>
    transactions.Find((transactions => transactions.Id == id)))
    .WithName(GetCashEndpoint);

app.MapPost("/add", (CreateCashDto newCash) =>
{
    CashDto transaction = new(
        transactions.Count + 1,
        newCash.Name,
        newCash.Description
    );
    transactions.Add(transaction);
    return Results.CreatedAtRoute(GetCashEndpoint, new { id = transaction.Id }, transaction);
});

app.MapPut("/update/{id}", (int id, UpdateCashDto updateCash) =>
{
    var index = transactions.FindIndex(t => t.Id == id);
    transactions[index] = new CashDto(
        id,
        updateCash.Name,
        updateCash.Description);
    
    return Results.Ok("Updated Cash");
});

app.MapPut("/delete/{id}", (int id) =>
{
    transactions.RemoveAll(t => t.Id == id);
    return Results.Ok("Deleted Transaction");
});

app.Run();