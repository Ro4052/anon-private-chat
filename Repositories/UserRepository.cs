using AnonPrivateChat.Models;
using System;
using System.Collections.Generic;

namespace AnonPrivateChat.Repositories
{
    public class UserRepository : IRepository<User>
    {
        private List<User> _users = new List<User>();

        public User GetOne(Guid id)
        {
            return _users.Find(user => user.Id == id);
        }

        public List<User> GetAll()
        {
            return _users;
        }

        public void AddOne(User user)
        {
            _users.Add(user);
        }

        public void RemoveOne(Guid id)
        {
            var user = GetOne(id);
            _users.Remove(user);
        }
    }
}
