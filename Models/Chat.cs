using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnonPrivateChat.Models
{
    public class Chat
    {
        public readonly Guid Id;
        private List<User> _users { get; }

        public Chat(Guid id)
        {
            Id = id;
            _users = new List<User>();
        }

        public List<User> Users
        {
            get { return _users;  }
        }
    }
}
