using Api.Dtos;
using AutoMapper;
using Business.Models;

namespace Api.MappingProfiles;

public class ProductProfile : Profile
{
    public ProductProfile()
    {
        CreateMap<Product, ProductDto>();
        CreateMap<ProductAddDto, ProductAdd>();
        CreateMap<ProductUpdateDto, ProductUpdate>();
    }
}