using AnonPrivateChat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnonPrivateChat.Services
{
    public interface IUserService
    {
        Guid CreateUser(Guid chatId);

        User GetUser(Guid id);
    }
}
