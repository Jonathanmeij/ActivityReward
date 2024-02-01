using MediatR;

namespace Business.Events;

public class ProductUpdatedEvent : INotification
{
    public Guid Id { get; }

    public ProductUpdatedEvent(Guid id)
    {
        Id = id;

    }
}