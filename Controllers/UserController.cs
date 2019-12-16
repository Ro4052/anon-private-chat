using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AnonPrivateChat.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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

        [HttpGet]
        [Route("/init")]
        public Guid Init()
        {
            return _userService.CreateUser();
        }
    }
}
