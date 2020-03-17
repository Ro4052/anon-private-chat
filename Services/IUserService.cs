using AnonPrivateChat.Models;
using System;

namespace AnonPrivateChat.Services
{
    public interface IUserService
    {
        Guid CreateUser(Guid chatId);

        User GetUser(Guid id);

        void UpdateUsername(Guid id, string username);
    }
}
