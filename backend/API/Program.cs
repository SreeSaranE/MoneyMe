using API.Endpoints;
using API.Extensions;
using Data.Interfaces;
using Data.Repository;
using Service.Interfaces;
using Service.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddValidation();
builder.AddCashStoreDb();

builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();
builder.Services.AddScoped<ITransactionTypeRepository, TransactionTypeRepository>();

builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<ITransactionTypeService, TransactionTypeService>();

builder.WebHost.UseUrls("http://0.0.0.0:5196");

builder.Services.AddCors(options =>
{
    options.AddPolicy("React",
        policy =>
        {
            policy
                // .WithOrigins("http://10.170.177.113:5173", "http://localhost:5173", "http://157.51.67.4:5173"),
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseCors("React");

// Initialize database
app.MigrateDb();

// Map endpoints
app.MapCashEndpoints();
app.MapCategoryEndpoints();
app.MapTransactionTypeEndpoints();

app.Run();