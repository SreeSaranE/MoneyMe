using API.Endpoints;
using API.Extensions;
using Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddValidation();
builder.AddCashStoreDb();

var app = builder.Build();

// Initialize database
app.MigrateDb();

// Map endpoints
app.MapCashEndpoints();
app.MapCategoryEndpoints();

app.Run();