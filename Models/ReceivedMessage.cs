using System;

namespace AnonPrivateChat.Models
{
    public class ReceivedMessage
    {
        public Guid UserId { get; private set; }
        public string Msg { get; private set; }

        public ReceivedMessage(Guid userId, string msg)
        {
            UserId = userId;
            Msg = msg;
        }
    }
}
