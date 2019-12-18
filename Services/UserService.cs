using AnonPrivateChat.Models;
using System;
using System.Collections.Generic;

namespace AnonPrivateChat.Services
{
    public class UserService : IUserService
    {
        private readonly List<User> _users = new List<User>();

        public Guid CreateUser()
        {
            var newId = Guid.NewGuid();
            var newUser = new User(newId);
            _users.Add(newUser);

            return newId;
        }

        public User GetUser(Guid id)
        {
            return _users.Find(user => user.Id == id);
        }
    }
}
