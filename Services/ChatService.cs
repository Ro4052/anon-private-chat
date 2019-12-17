using AnonPrivateChat.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Timers;

namespace AnonPrivateChat.Services
{
    public class ChatService : IChatService
    {
        private List<Chat> _chats = new List<Chat>();

        public Guid CreateChat()
        {
            var chatId = Guid.NewGuid();
            var chat = new Chat(chatId);
            _chats.Add(chat);

            var timer = new Timer(300000);
            timer.Elapsed += (sender, e) => RemoveUnjoinedChat(chat);
            timer.AutoReset = false;
            timer.Enabled = true;

            return chatId;
        }

        private void RemoveUnjoinedChat(Chat chat)
        {
            if (chat.Users.Count == 0)
            {
                _chats.Remove(chat);
            }
        }
    }
}
