using System;

namespace AnonPrivateChat.Services
{
    public interface IChatService
    {
        Guid CreateChat();

        Guid InitChat(Guid? userId, Guid chatId);
    }
}
