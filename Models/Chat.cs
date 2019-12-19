using System;
using System.Collections.Generic;

namespace AnonPrivateChat.Models
{
    public class Chat
    {
        public readonly Guid Id;
        private List<Guid> _userIds { get; }

        public Chat(Guid id)
        {
            Id = id;
            _userIds = new List<Guid>();
        }

        public List<Guid> UserIds
        {
            get { return _userIds;  }
        }

        public void AddMember(Guid userId)
        {
            _userIds.Add(userId);
        }
    }
}
