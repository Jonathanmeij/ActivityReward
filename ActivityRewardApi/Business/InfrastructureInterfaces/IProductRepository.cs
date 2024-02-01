using Business.Models;

namespace Business.InfrastructureInterfaces;

public interface IProductRepository
{
    public List<Product> GetAll();
    public Product? Get(Guid id);
    public void Add(Product productToAdd);
    Product? Search(string name);
    void Delete(Product productToDelete);
}