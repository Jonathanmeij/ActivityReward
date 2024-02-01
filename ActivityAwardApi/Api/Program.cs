#pragma warning disable CA1506 // Avoid excessive class coupling
using Api.Helpers;
using Azure.Storage.Queues;
using Business.InfrastructureInterfaces;
using Business.Services;
using Business.Services.Interfaces;
using Common;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Azure;
using Infrastructure.Clients;
using Infrastructure.EF.Context;
using Infrastructure.EventHandlers;
using Infrastructure.Events;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Azure;
using Microsoft.IdentityModel.Tokens;
using NSwag;
using NSwag.Generation.Processors.Security;
using System.Net.Mail;
using System.Text;
using System.Text.Json.Serialization;
using Business.Models;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(options => options.Filters.Add<UnitOfWorkActionFilter>()).AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    options.JsonSerializerOptions.Converters.Add(new DateTimeConverterUsingDateTimeParse());
});

builder.Services.AddOpenApiDocument(document =>
{
    document.DocumentName = "v1";
    document.Title = "Floral Trade Group ### Api";
    document.Version = "v1";
    document.AddSecurity("JWT", Enumerable.Empty<string>(), new OpenApiSecurityScheme
    {
        Type = OpenApiSecuritySchemeType.ApiKey,
        Name = "X-Api-Key",
        In = OpenApiSecurityApiKeyLocation.Header,
        Description = "Paste your X-Api-Key and press [Aauthorize]"
    });
    document.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("JWT"));
    document.SchemaSettings.SchemaProcessors.Add(new MarkAsRequiredIfNonNullableSchemaProcessor());
    document.SchemaSettings.SchemaProcessors.Add(new RenameDtoSchemaProcessor());
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            ValidateLifetime = true,
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"],
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

// builder.Services.AddDbContext<FitnessTrackerContext>(
//     options => options.UseSqlServer(builder.Configuration.GetConnectionString("WebshopConnection"),
//             providerOptions => providerOptions.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery)
//                 .EnableRetryOnFailure()
//                 .MigrationsAssembly("Infrastructure"))
//         .EnableSensitiveDataLogging()
//         .UseQueryTrackingBehavior(QueryTrackingBehavior.TrackAll));

builder.Services.AddDbContext<FitnessTrackerContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"),
        providerOptions => providerOptions.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery)
            .MigrationsAssembly("Infrastructure"))
        .EnableSensitiveDataLogging()
        .UseQueryTrackingBehavior(QueryTrackingBehavior.TrackAll);
});

builder.Services.AddIdentityCore<User>(options =>
{
    // options.SignIn.RequireConfirmedAccount = false;
    options.User.RequireUniqueEmail = true;
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 4;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
}).AddEntityFrameworkStores<FitnessTrackerContext>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy => policy.WithOrigins("localhost")
        );
});

builder.Services.AddHttpContextAccessor();

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<Program>();

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<ProductAddedHandler>());

builder.Services.AddScoped<IEventCollector, EventCollector>();

builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IDateTimeProvider, DateTimeProvider>();

builder.Services.AddScoped<IMailClient>(x => new MailClient(new SmtpClient(builder.Configuration["MailServer:Server"])));

builder.Services.AddAzureClients(clientBuilder =>
{
    clientBuilder.AddQueueServiceClient(builder.Configuration.GetConnectionString("FunctionQueueConnection"))
        .WithName(Constants.UPDATEDPRODUCTSCLIENTNAME).ConfigureOptions(
            options => options.MessageEncoding = QueueMessageEncoding.Base64);

    clientBuilder.AddTableServiceClient(builder.Configuration.GetConnectionString("StorageConnection")).WithName(Constants.DELETEDPRODUCTSTABLENAME);

    clientBuilder.AddBlobServiceClient(builder.Configuration.GetConnectionString("BlobConnection")).WithName(Constants.ADDEDPRODUCTSCLIENTNAME);
});

WebApplication app = builder.Build();

using (IServiceScope scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<FitnessTrackerContext>().Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi();
}

app.UseHsts();
app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();

#pragma warning restore CA1506 // Avoid excessive class coupling