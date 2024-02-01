using Infrastructure.EF.Context;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Api.Helpers;

public class UnitOfWorkActionFilter : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        FitnessTrackerContext db = context.HttpContext.RequestServices.GetRequiredService<FitnessTrackerContext>();
        db.SaveEntitiesChanges();
    }
}