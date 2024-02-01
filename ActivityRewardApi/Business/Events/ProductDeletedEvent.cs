using Business.Models;
using MediatR;

namespace Business.Events;

public class ProductDeletedEvent : INotification
{
    public Product Product { get; }

    public ProductDeletedEvent(Product product)
    {
        Product = product;
    }
}