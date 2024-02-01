using Business.Services.Interfaces;
using Infrastructure.Azure;
using Infrastructure.EF.Context;
using Microsoft.Azure.Functions.Worker;

namespace Functions;

public class ProcessProcuctChangeFunction
{
    private readonly IProductService _productService;
    private readonly FitnessTrackerContext _databaseContext;

    public ProcessProcuctChangeFunction(IProductService productService, FitnessTrackerContext databaseContext)
    {
        _productService = productService;
        _databaseContext = databaseContext;
    }

    [Function(nameof(ProcessProcuctChangeFunction))]
    public void Run([QueueTrigger(Constants.PRODUCTUPDATEDQUEUENAME, Connection = "FunctionQueueConnection")] ProductUpdatedQueueItem message)
    {
        _productService.UpdateProcessed(message.Id);
        _databaseContext.SaveChanges();
    }
}
