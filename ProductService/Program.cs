var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();



app.MapGet("/products", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new Product(Guid.NewGuid(), $"product_{index}"))
    .ToArray();
    return forecast;
}); 

app.Run("http://localhost:5053");


record Product(Guid id, string name);

