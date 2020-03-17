using AnonPrivateChat.Models;
using System;

namespace AnonPrivateChat.Services
{
    public interface IChatService
    {
        Guid CreateChat();

        string InitChat(Guid? userId, Guid chatId);
    }
}
