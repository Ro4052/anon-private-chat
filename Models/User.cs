using System;
using System.Net.WebSockets;
using System.Threading;

namespace AnonPrivateChat.Models
{
    public class User
    {
        public readonly Guid Id;
        public readonly Guid ChatId;
        public string Username { get; set; }
        public WebSocket Socket { get; set; }
        public CancellationToken Ct { get; set; }

        public User(Guid id, Guid chatId)
        {
            Id = id;
            ChatId = chatId;
        }
    }
}
