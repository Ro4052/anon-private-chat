﻿namespace AnonPrivateChat.Models
{
    public class Message
    {
        public string User { get; private set; }
        public string Msg { get; private set; }
        public bool IsMine { get; private set; }

        public Message(string user, string msg, bool isMine)
        {
            User = user;
            Msg = msg;
            IsMine = isMine;
        }
    }
}
