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
    public class ChatController : ControllerBase
    {
        private readonly IChatService _chatService;

        public ChatController(IChatService chatService)
        {
            _chatService = chatService;
        }

        [HttpPost]
        [Route("/create-chat")]
        public Guid CreateChat()
        {
            return _chatService.CreateChat();
        }

        [HttpGet]
        [Route("/init-chat")]
        public string GetMessages()
        {
            return "init-chat";
        }
    }
}
