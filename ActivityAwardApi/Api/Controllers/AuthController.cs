using Business.Models;
using Business.Services;
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
    public async Task<ActionResult> Register(RegisterRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
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
            return Unauthorized("Invalid credentials");
        }

        if (result.Succeeded)
        {
            request.Password = "";

            var accessToken = _tokenService.CreateToken(userInDb, _configuration);
            await _contex.SaveChangesAsync();

            return Ok(new LoginResponse
            {
                Username = request.Username,
                Email = request.Email,
                Token = accessToken
            });
        }

        foreach (var error in result.Errors)
        {
            ModelState.AddModelError(error.Code, error.Description);
        }

        return BadRequest(ModelState);
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse>> Authenticate([FromBody] LoginRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var managedUser = await _userManager.FindByEmailAsync(request.Email);

        if (managedUser == null)
        {
            return BadRequest("Invalid credentials");
        }

        var isPasswordValid = await _userManager.CheckPasswordAsync(managedUser, request.Password);

        if (!isPasswordValid)
        {
            return BadRequest("Invalid credentials");
        }

        var userInDb = await _userManager.FindByEmailAsync(request.Email);

        if (userInDb == null)
        {
            return Unauthorized();
        }

        var accessToken = _tokenService.CreateToken(userInDb, _configuration);
        await _contex.SaveChangesAsync();

        return Ok(new LoginResponse
        {
            Username = userInDb.UserName,
            Email = userInDb.Email,
            Token = accessToken
        });
    }
}