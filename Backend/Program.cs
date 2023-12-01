using Microsoft.AspNetCore.Cors.Infrastructure;
using DotNetEnv;

// Load environment variables
Env.Load();


var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => options.AddPolicy(
    name: "CorsPolicy",
    policy => policy.WithOrigins("http://localhost:4200","http://167.99.144.135").AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()
    )
);

// add database environment variables
builder.Configuration.AddEnvironmentVariables(prefix: "DB_");


var app = builder.Build();

app.UseCors("CorsPolicy");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
