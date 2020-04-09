using AnonPrivateChat.Models;
using AnonPrivateChat.Repositories;
using System;

namespace AnonPrivateChat.Services
{
    public class UserService : IUserService
    {
        private readonly ISocketService _socketService;
        private readonly IRepository<User> _userRepo;
        private readonly IRepository<Chat> _chatRepo;

        public UserService(ISocketService socketService, IRepository<User> userRepo, IRepository<Chat> chatRepo)
        {
            _socketService = socketService;
            _userRepo = userRepo;
            _chatRepo = chatRepo;
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

        public void UpdateUsername(Guid id, string username)
        {
            User user = _userRepo.GetOne(id);
            Chat chat = _chatRepo.GetOne(user.ChatId);

            string oldUsername = user.Username;
            user.Username = username;
            _socketService.BroadcastStatusMessage(chat, user, "UPDATE_USERNAME", oldUsername);
        }
    }
}
