using System;

namespace AnonPrivateChat.Models
{
    public class User
    {
        public readonly Guid Id;

        public User(Guid id)
        {
            Id = id;
        }
    }
}
