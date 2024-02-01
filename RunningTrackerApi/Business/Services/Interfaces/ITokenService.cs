using Business.Models;
using Microsoft.Extensions.Configuration;

namespace Business.Services;

public interface ITokenService
{
    string CreateToken(User user, IConfiguration configuration);
}