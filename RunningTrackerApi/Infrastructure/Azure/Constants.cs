namespace Infrastructure.Azure;
public static class Constants
{
    public const string PRODUCTUPDATEDQUEUENAME = "productupdatedqueue";
    public const string DELETEDPRODUCTSTABLENAME = "DeletedProductsTable";
    public const string ADDEDPRODUCTSBLOBCONTAINERNAME = "addedproducts";

    public const string ADDEDPRODUCTSCLIENTNAME = "BlobConnectionClientName";
    public const string UPDATEDPRODUCTSCLIENTNAME = "QueueClientName";
    public const string DELETEDPRODUCTSCLIENTNAME = "TableStorageClientName";

}
