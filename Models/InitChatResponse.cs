using System;

namespace AnonPrivateChat.Models
{
    public class InitChatResponse
    {
        public readonly Guid Id;
        public readonly string Username;

        public InitChatResponse(Guid id, string username)
        {
            Id = id;
            Username = username;
        }
    }
}
