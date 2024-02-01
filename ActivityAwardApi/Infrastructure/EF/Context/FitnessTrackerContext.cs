using Business.InfrastructureInterfaces;
using Business.Models;
using MediatR;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.EF.Context;

public class FitnessTrackerContext : IdentityUserContext<User>
{
    private readonly IMediator _mediatr;
    private readonly IEventCollector _eventCollector;
    private readonly IConfiguration _configuration;

    public FitnessTrackerContext(DbContextOptions<FitnessTrackerContext> options, IMediator mediatr, IEventCollector eventCollector, IConfiguration configuration) : base(options)
    {
        _mediatr = mediatr;
        _eventCollector = eventCollector;
        _configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite(_configuration.GetConnectionString("DefaultConnection"));

    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }

    public int SaveEntitiesChanges()
    {
        int saveChangedResult = base.SaveChanges();

        foreach (INotification item in _eventCollector.Get())
        {
            _mediatr.Publish(item);
        }

        _eventCollector.Clear();

        return saveChangedResult;
    }
}
