using AspNetServer.Data;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
    builder => builder.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000"));
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo { Title = "ASP .NET React Tutorial", Version = "v1" });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI(swaggerUiOptions =>
{
    swaggerUiOptions.DocumentTitle = "ASP .NET React Tutorial";
    swaggerUiOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "web api serving");
    swaggerUiOptions.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();
app.UseCors("CorsPolicy");

app.MapGet("/getAllPosts", async () => await PostRepository.GetPostsAsync())
    .WithTags("Post Endpoints");

app.MapGet("/getPostById", async (int postId) =>
{
    var post = await PostRepository.GetPostByIdAsync(postId);
    if (post != null)
    {
        return Results.Ok(post);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Post Endpoints");

app.MapPost("/createPost", async (Post post) =>
{
    var isCreated = await PostRepository.CreateAsync(post);
    if (isCreated)
    {
        return Results.Ok("Create successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Post Endpoints");

app.MapPut("/updatePost", async (Post post) =>
{
    var isUpdated = await PostRepository.UpdateAsync(post);
    if (isUpdated)
    {
        return Results.Ok("Update successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Post Endpoints");

app.MapDelete("/deletePost", async (int id) =>
{
    var isDeleted = await PostRepository.DeleteAsync(id);
    if (isDeleted)
    {
        return Results.Ok("Delete successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Post Endpoints");

app.Run();
