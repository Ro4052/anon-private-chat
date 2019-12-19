using AnonPrivateChat.Models;
using AnonPrivateChat.Repositories;
using System;

namespace AnonPrivateChat.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _userRepo;

        public UserService(IRepository<User> userRepo)
        {
            _userRepo = userRepo;
        }

        public Guid CreateUser(Guid chatId)
        {
            var newId = Guid.NewGuid();
            var newUser = new User(newId, chatId);
            _userRepo.AddOne(newUser);

            return newId;
        }

        public User GetUser(Guid id)
        {
            return _userRepo.GetOne(id);
        }
    }
}
