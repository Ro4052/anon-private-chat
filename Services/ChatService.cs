using AnonPrivateChat.Exceptions;
using AnonPrivateChat.Models;
using System;
using System.Collections.Generic;
using System.Threading;

namespace AnonPrivateChat.Services
{
    public class ChatService : IChatService
    {
        private readonly IUserService _userService;
        private List<Chat> _chats = new List<Chat>();

        public ChatService(IUserService userService)
        {
            _userService = userService;
        }

        private static void RemoveUnjoinedChat(List<Chat> chats, Chat chat)
        {
            Thread.Sleep(300000);
            if (chat.Users.Count == 0)
            {
                chats.Remove(chat);
            }
        }

        public Guid CreateChat()
        {
            var chatId = Guid.NewGuid();
            var chat = new Chat(chatId);
            _chats.Add(chat);

            Thread thread = new Thread(() => RemoveUnjoinedChat(_chats, chat));
            thread.Start();

            return chatId;
        }


        public Guid InitChat(Guid? userId, Guid chatId)
        {
            var chat = _chats.Find(c => c.Id == chatId);
            if (chat == null)
            {
                throw new ChatNotFoundException();
            }

            var convertedUserId = userId.GetValueOrDefault();
            if (userId == null || _userService.GetUser(convertedUserId) == null)
            {
                convertedUserId = _userService.CreateUser();
            }

            chat.AddMember(convertedUserId);

            return convertedUserId;
        }
    }
}
