using Azure.Data.Tables;
using Business.Events;
using Infrastructure.Azure;
using MediatR;
using Microsoft.Extensions.Azure;

namespace Infrastructure.EventHandlers;

public class ProductDeletedHandler : INotificationHandler<ProductDeletedEvent>
{
    private readonly TableClient _tableClient;

    public ProductDeletedHandler(IAzureClientFactory<TableServiceClient> clientFactory)
    {
        TableServiceClient tableServiceClient = clientFactory.CreateClient(Constants.DELETEDPRODUCTSCLIENTNAME);

        _tableClient = tableServiceClient.GetTableClient(Constants.DELETEDPRODUCTSTABLENAME);

        _tableClient.CreateIfNotExists();
    }

    public Task Handle(ProductDeletedEvent notification, CancellationToken cancellationToken)
    {
        DeletedProductEntity jaja = new(notification.Product.Id, notification.Product.Name, notification.Product.Processed);
        _tableClient.AddEntity<DeletedProductEntity>(jaja, cancellationToken);
        return Task.CompletedTask;
    }
}