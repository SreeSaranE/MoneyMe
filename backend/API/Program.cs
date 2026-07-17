using API.Data;
using API.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddValidation();
builder.AddCashStoreDb();

var app = builder.Build();

app.MapCashEndpoints();

app.MigrateDb();

app.Run();