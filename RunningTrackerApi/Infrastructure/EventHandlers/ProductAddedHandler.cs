using Azure.Storage.Blobs;
using Business.Events;
using Infrastructure.Azure;
using Infrastructure.Clients;
using MediatR;
using Microsoft.Extensions.Azure;

namespace Infrastructure.EventHandlers;

public class ProductAddedHandler : INotificationHandler<ProductAddedEvent>
{
    private readonly IMailClient _mailClient;
    private readonly BlobContainerClient _blobContainerClient;

    public ProductAddedHandler(IMailClient mailClient, IAzureClientFactory<BlobServiceClient> clientFactory)
    {
        _mailClient = mailClient;

        BlobServiceClient blobServiceClient = clientFactory.CreateClient(Constants.ADDEDPRODUCTSCLIENTNAME);

        _blobContainerClient = blobServiceClient.GetBlobContainerClient(Constants.ADDEDPRODUCTSBLOBCONTAINERNAME);
        _blobContainerClient.CreateIfNotExists();
    }

    public Task Handle(ProductAddedEvent notification, CancellationToken cancellationToken)
    {
        BlobClient blobClient = _blobContainerClient.GetBlobClient(notification.Id.ToString() + ".txt");

        blobClient.Upload(BinaryData.FromString(notification.Id.ToString()), true, cancellationToken);

        _mailClient.SendMail("noreply@floraltradegroup.com", "afnemer@floraltradegroup.com", "Nieuw product", "Er is een nieuwe product aangemaakt in de api");

        return Task.CompletedTask;
    }
}
