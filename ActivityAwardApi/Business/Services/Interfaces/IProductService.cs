using Business.Models;
using ErrorOr;

namespace Business.Services.Interfaces;

public interface IProductService
{
    ErrorOr<Product> Add(ProductAdd productToAdd);

    ErrorOr<Product> Update(Guid id, ProductUpdate productToUpdate);
    ErrorOr<Product> UpdateProcessed(Guid id);

    ErrorOr<Deleted> Delete(Guid id);
}