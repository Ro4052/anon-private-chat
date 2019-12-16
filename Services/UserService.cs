using AnonPrivateChat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
    }
}
