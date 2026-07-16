using API.Data;
using API.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddValidation();

var connectionString = "Data Source=TransactionStore.db";
builder.Services.AddSqlite<CashStoreContext>(connectionString);

var app = builder.Build();

app.MapCashEndpoints();

app.MigrateDb();

app.Run();