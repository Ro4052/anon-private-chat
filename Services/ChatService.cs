using AnonPrivateChat.Exceptions;
using AnonPrivateChat.Models;
using AnonPrivateChat.Repositories;
using Newtonsoft.Json;
using System;
using System.Threading;

namespace AnonPrivateChat.Services
{
    public class ChatService : IChatService
    {
        private readonly IUserService _userService;
        private readonly IRepository<Chat> _chatRepo;

        public ChatService(IUserService userService, IRepository<Chat> chatRepo)
        {
            _userService = userService;
            _chatRepo = chatRepo;
        }

        private static bool RemoveUnjoinedChat(IRepository<Chat> chats, Chat chat)
        {
            Thread.Sleep(300000);
            if (chat.UserIds.Count == 0)
            {
                chats.RemoveOne(chat.Id);
                return true;
            }

            return false;
        }

        public Guid CreateChat()
        {
            var chatId = Guid.NewGuid();
            var chat = new Chat(chatId);
            _chatRepo.AddOne(chat);

            Thread thread = new Thread(() =>
            {
                bool chatClosed = false;
                while(!chatClosed)
                {
                    chatClosed = RemoveUnjoinedChat(_chatRepo, chat);
                }
            });
            thread.Start();

            return chatId;
        }


        public string InitChat(Guid? userId, Guid chatId)
        {
            var chat = _chatRepo.GetOne(chatId);
            if (chat == null)
            {
                throw new ChatNotFoundException();
            }

            var convertedUserId = userId.GetValueOrDefault();
            if (userId == null || _userService.GetUser(convertedUserId) == null)
            {
                convertedUserId = _userService.CreateUser(chatId);
            }

            chat.AddMember(convertedUserId);

            var username = _userService.GetUser(convertedUserId).Username;
            var response = new InitChatResponse(convertedUserId, username);

            return JsonConvert.SerializeObject(response);
        }
    }
}
