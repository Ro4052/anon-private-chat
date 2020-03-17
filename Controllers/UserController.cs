using AnonPrivateChat.Parsers;
using AnonPrivateChat.Services;
using Microsoft.AspNetCore.Mvc;

namespace AnonPrivateChat.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("/api/update-username")]
        public void UpdateUsername(UpdateUsernameParser body)
        {
            _userService.UpdateUsername(body.Id, body.Username);
        }
    }
}
