using Api.Dtos;
using Business.Models;
using Business.Services;
using ErrorOr;
using Infrastructure.EF.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Tweeter.Shared.Models;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly ITokenService _tokenService;
    private readonly IConfiguration _configuration;
    private readonly FitnessTrackerContext _contex;

    public AuthController(UserManager<User> userManager, ITokenService tokenService, IConfiguration configuration,
        FitnessTrackerContext context)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _configuration = configuration;
        _contex = context;
    }

    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<Response<LoginResponse>>> Register(RegisterRequest request)
    {
        Response<LoginResponse> response = new();
        if (!ModelState.IsValid)
        {
            response.Success = false;
            response.Message = "Invalid credentials";
            return Ok(response);
        }

        var result = await _userManager.CreateAsync(
            new User
            {
                UserName = request.Username,
                Email = request.Email,
            }, request.Password);

        var userInDb = await _userManager.FindByEmailAsync(request.Email);

        if (userInDb == null)
        {
            response.Success = false;
            response.Message = "User not found";
            return Ok(response);
        }

        if (result.Succeeded)
        {
            request.Password = "";

            var accessToken = _tokenService.CreateToken(userInDb, _configuration);
            await _contex.SaveChangesAsync();
            
            response.Success = true;
            response.Data = new LoginResponse
            {
                Username = userInDb.UserName,
                Email = userInDb.Email,
                Token = accessToken
            };

            return Ok(response);
        }

        foreach (var error in result.Errors)
        {
            ModelState.AddModelError(error.Code, error.Description);
        }
        
        response.Success = false;
        response.Message = "Invalid credentials";

        return Ok(response);
    }

    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<Response<LoginResponse>>> Authenticate([FromBody] LoginRequest request)
    {
        Response<LoginResponse> response = new();
        if (!ModelState.IsValid)
        {
            response.Success = false;
            response.Message = "Invalid credentials";
            return  Ok(response);
        }

        var managedUser = await _userManager.FindByEmailAsync(request.Email);

        if (managedUser == null)
        {
            response.Success = false;
            response.Message = "Invalid credentials";
            return Ok(response);
        }

        var isPasswordValid = await _userManager.CheckPasswordAsync(managedUser, request.Password);

        if (!isPasswordValid)
        {
            response.Success = false;
            response.Message = "Invalid credentials";
            return Ok(response);
        }

        var userInDb = await _userManager.FindByEmailAsync(request.Email);

        if (userInDb == null)
        {
            response.Success = false;
            response.Message = "Invalid credentials";
            return Ok(response);
        }

        var accessToken = _tokenService.CreateToken(userInDb, _configuration);
        await _contex.SaveChangesAsync();
        
        response.Success = true;
        response.Data = new LoginResponse
        {
            Username = userInDb.UserName,
            Email = userInDb.Email,
            Token = accessToken
        };

        return Ok(response);
    }
}