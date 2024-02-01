using Business.InfrastructureInterfaces;
using MediatR;

namespace Infrastructure.Events;

public class EventCollector : IEventCollector
{
    private readonly List<INotification> _events = new();

    public void Add(INotification eventItem)
    {
        _events.Add(eventItem);
    }

    public List<INotification> Get()
    {
        return _events;
    }

    public void Clear()
    {
        _events.Clear();
    }
}