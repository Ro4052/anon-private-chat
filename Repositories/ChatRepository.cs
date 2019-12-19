using AnonPrivateChat.Models;
using System;
using System.Collections.Generic;

namespace AnonPrivateChat.Repositories
{
    public class ChatRepository : IRepository<Chat>
    {
        private List<Chat> _chats = new List<Chat>();

        public Chat GetOne(Guid id)
        {
            return _chats.Find(chat => chat.Id == id);
        }

        public List<Chat> GetAll()
        {
            return _chats;
        }

        public void AddOne(Chat chat)
        {
            _chats.Add(chat);
        }

        public void RemoveOne(Guid id)
        {
            var chat = GetOne(id);
            _chats.Remove(chat);
        }
    }
}
