using MediatR;

namespace Business.InfrastructureInterfaces;

public interface IEventCollector
{
    void Add(INotification eventItem);
    List<INotification> Get();
    void Clear();
}