using Azure;
using Azure.Data.Tables;

namespace Infrastructure.Azure;

public class DeletedProductEntity : ITableEntity
{
    public DeletedProductEntity(Guid id, string name, bool processed)
    {
        Id = id;
        Name = name;
        Processed = processed;

        PartitionKey = id.ToString();
        RowKey = Id.ToString();
        Timestamp = DateTime.Now;
    }

    // Product properties
    public Guid Id { get; set; }
    public string Name { get; set; }
    public bool Processed { get; set; }

    // Default ITableEntity properties
    public string PartitionKey { get; set; }
    public string RowKey { get; set; }
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }

}