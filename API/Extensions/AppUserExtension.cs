using API.DTOs;
using API.Interfaces;
using API.Models;

namespace API.Extensions;

public static class AppUserExtension
{
    public static UserDto ToDto(this AppUser user, ITokenService tokenService)
    {
        return new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            DisplayName = user.DisplayName,
            Token = tokenService.CreateToken(user)
        };
    }
}
