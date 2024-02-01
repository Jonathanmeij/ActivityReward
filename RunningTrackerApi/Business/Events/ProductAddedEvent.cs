using MediatR;

namespace Business.Events;

public class ProductAddedEvent : INotification
{
    public Guid Id { get; }

    public ProductAddedEvent(Guid id)
    {
        Id = id;
    }
}