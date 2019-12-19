using System;
using AnonPrivateChat.Parsers;
using AnonPrivateChat.Services;
using Microsoft.AspNetCore.Mvc;

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
        [Route("/api/create-chat")]
        public Guid CreateChat()
        {
            return _chatService.CreateChat();
        }

        [HttpPost]
        [Route("/api/init-chat")]
        public Guid InitChat(InitChatParser body)
        {
            return _chatService.InitChat(body.GetParsedUserId(), body.GetParsedChatId());
        }
    }
}
