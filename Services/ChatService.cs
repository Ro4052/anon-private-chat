using AnonPrivateChat.Exceptions;
using AnonPrivateChat.Models;
using AnonPrivateChat.Repositories;
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

        private static void RemoveUnjoinedChat(IRepository<Chat> chats, Chat chat)
        {
            Thread.Sleep(300000);
            if (chat.UserIds.Count == 0)
            {
                chats.RemoveOne(chat.Id);
            }
        }

        public Guid CreateChat()
        {
            var chatId = Guid.NewGuid();
            var chat = new Chat(chatId);
            _chatRepo.AddOne(chat);

            Thread thread = new Thread(() => RemoveUnjoinedChat(_chatRepo, chat));
            thread.Start();

            return chatId;
        }


        public Guid InitChat(Guid? userId, Guid chatId)
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

            //if (chat.UserIds.FindAll(c => c == convertedUserId).Count == 0)
            //{
            //    chat.AddMember(convertedUserId);
            //}
            chat.AddMember(convertedUserId);

            return convertedUserId;
        }
    }
}
