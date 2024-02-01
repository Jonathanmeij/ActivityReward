using Azure.Storage.Queues;
using Business.Events;
using Infrastructure.Azure;
using MediatR;
using Microsoft.Extensions.Azure;
using System.Text.Json;

namespace Infrastructure.EventHandlers;

public class ProductUpdatedHandler : INotificationHandler<ProductUpdatedEvent>
{
    private readonly QueueClient _queueClient;

    public ProductUpdatedHandler(IAzureClientFactory<QueueServiceClient> clientFactory)
    {
        QueueServiceClient queueServiceClient = clientFactory.CreateClient(Constants.UPDATEDPRODUCTSCLIENTNAME);
        _queueClient = queueServiceClient.CreateQueue(Constants.PRODUCTUPDATEDQUEUENAME);
    }

    public Task Handle(ProductUpdatedEvent notification, CancellationToken cancellationToken)
    {
        string message = JsonSerializer.Serialize(new ProductUpdatedQueueItem
        {
            Id = notification.Id
        });

        _queueClient.SendMessage(message, cancellationToken);

        return Task.CompletedTask;
    }
}