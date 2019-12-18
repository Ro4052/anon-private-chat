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

        //[HttpGet]
        //[Route("/init")]
        //public Guid Init()
        //{
        //    return _userService.CreateUser();
        //}
    }
}
