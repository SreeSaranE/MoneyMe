using API.Endpoints;
using API.Extensions;
using Data;
using Data.Interfaces;
using Data.Repository;
using Service.Interfaces;
using Service.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddValidation();
builder.AddCashStoreDb();

builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();

builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();

var app = builder.Build();

// Initialize database
app.MigrateDb();

// Map endpoints
app.MapCashEndpoints();
app.MapCategoryEndpoints();

app.Run();