var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();



app.MapGet("/products", () =>
{
    var forecast = Enumerable.Range(1, 2).Select(index =>
        new Product(index, $"product_{index}"))
    .ToArray();
    return forecast;
});

app.Run("http://localhost:5053");


record Product(int id, string name);

