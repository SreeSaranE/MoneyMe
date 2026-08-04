using Data;
using API.Endpoints;
using API.Extentions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddValidation();
builder.AddCashStoreDb();

var app = builder.Build();

app.MapCashEndpoints();
app.MapCategoryEndpoints();

app.MigrateDb();

app.Run();