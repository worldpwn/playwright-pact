var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var proxyClient = new HttpClient();
app.MapGet("/products-gateway", async () =>
{
    var result = await proxyClient.GetAsync("http://localhost:5053/products");
    string body = await result.Content.ReadAsStringAsync();
    return body;
});

app.Run("http://localhost:5054");
