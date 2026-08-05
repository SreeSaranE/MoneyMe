using API.Endpoints;
using API.Extensions;
using Data;
using Data.Interfaces;
using Data.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddValidation();
builder.AddCashStoreDb();

builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();

var app = builder.Build();

// Initialize database
app.MigrateDb();

// Map endpoints
app.MapCashEndpoints();
app.MapCategoryEndpoints();

app.Run();