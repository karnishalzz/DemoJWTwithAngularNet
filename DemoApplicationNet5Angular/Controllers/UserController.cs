using DemoApplicationNet5Angular.Data.Entities;
using DemoApplicationNet5Angular.Models;
using DemoApplicationNet5Angular.Models.DTO;
using DemoApplicationNet5Angular.Models.ViewModel;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace DemoApplicationNet5Angular.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        

        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ILogger<UserController> _logger;
        private readonly JWTConfig _jwtConfig;

        public UserController(ILogger<UserController> logger, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IOptions<JWTConfig> jWTConfig)
        {
            _logger = logger;
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtConfig = jWTConfig.Value;
        }

        [HttpPost("RegisterUser")]
        public async Task<object> RegisterUser([FromBody] AppUserViewModel model)
        {
            try
            {
                var user = new AppUser()
                {
                    FullName = model.Fullname,
                    Email = model.Email,
                    UserName = model.Email,
                    CreatedDate = DateTime.UtcNow,
                    ModifiedDate = DateTime.UtcNow,

                };

                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    return await Task.FromResult(new ResponseModel(Enums.ResponseCode.Ok, "User Registered", null));
                }
                return Task.FromResult(new ResponseModel(Enums.ResponseCode.Error, "", string.Join(",", result.Errors.Select(x => x.Description).ToArray())));

            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(Enums.ResponseCode.Error, ex.Message, null));
            }
           
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("AllUser")]
        public async Task<object> GetAllUsers()
        {
            try
            {
                var users = _userManager.Users.Select(x=> new UserDTO(x.FullName, x.Email, x.UserName, x.CreatedDate));
                return await Task.FromResult(new ResponseModel(Enums.ResponseCode.Ok, "", users));
            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(Enums.ResponseCode.Error, ex.Message, null));
            }

        }

        [HttpPost("LoginUser")]
        public async Task<object> LoginUser([FromBody] LoginUserViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
                    if (result.Succeeded)
                    {
                        var appUser = await _userManager.FindByEmailAsync(model.Email);
                        var user = new UserDTO(appUser.FullName, appUser.UserName, appUser.Email, appUser.CreatedDate);
                        user.Token = GenerateToken(appUser);
                        return await Task.FromResult(new ResponseModel(Enums.ResponseCode.Ok, "", user));
                    }
                    return Task.FromResult(new ResponseModel(Enums.ResponseCode.Error, "Invalid Email or Password", null));

                }
                return await Task.FromResult(new ResponseModel(Enums.ResponseCode.Error, "Email and Password is needed", null));
               
              
            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(Enums.ResponseCode.Error, ex.Message, null));
            }

        }

        private string GenerateToken(AppUser user)
        {
            var jwtHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtConfig.Key);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new System.Security.Claims.ClaimsIdentity(new[]
                {
                    new System.Security.Claims.Claim(JwtRegisteredClaimNames.NameId, user.Id),
                    new System.Security.Claims.Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new System.Security.Claims.Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                }),
                Expires = DateTime.UtcNow.AddHours(12),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Audience = _jwtConfig.Audience,
                Issuer = _jwtConfig.Issuer,
            };

            var token = jwtHandler.CreateToken(tokenDescriptor);
            return jwtHandler.WriteToken(token);
        }
    }
}
