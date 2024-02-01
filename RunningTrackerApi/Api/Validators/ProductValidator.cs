using Api.Dtos;
using FluentValidation;

namespace Api.Validators;

public class ProductValidator : AbstractValidator<ProductAddDto>
{
    public ProductValidator()
    {
        RuleFor(x => x.Name).NotEmpty();
    }
}