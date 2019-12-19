using AnonPrivateChat.Helpers;
using AnonPrivateChat.Models;
using AnonPrivateChat.Repositories;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

namespace AnonPrivateChat.Services
{
    public class SocketService : ISocketService
    {
        private readonly IRepository<User> _userRepo;
        private readonly IRepository<Chat> _chatRepo;

        public SocketService(IRepository<User> userRepo, IRepository<Chat> chatRepo)
        {
            _userRepo = userRepo;
            _chatRepo = chatRepo;
        }

        public async Task NewSocket(WebSocket socket, CancellationToken ct)
        {
            var userId = new Guid(await SocketHelper.ReceiveStringAsync(socket, ct));
            var user = _userRepo.GetOne(userId);
            var chat = _chatRepo.GetOne(user.ChatId);

            user.Socket = socket;
            user.Ct = ct;

            bool isSocketAlive = true;
            while (isSocketAlive)
            {
                try
                {
                    string msg = await ListenForMessage(user, chat);
                    if (msg == null) isSocketAlive = false;
                }
                catch (Exception)
                {
                    isSocketAlive = false; 
                }
            }

            user.Socket = null;
            chat.UserIds.Remove(userId);
        }

        private async Task<string> ListenForMessage(User user, Chat chat)
        {
            var msg = await SocketHelper.ReceiveStringAsync(user.Socket, user.Ct);
            if (msg != null)
            {
                await BroadCastMessage(chat, user, msg);
            }

            return msg;
        }

        private async Task BroadCastMessage(Chat chat, User user, string msg)
        {
            await Task.WhenAll(chat.UserIds.Select(async targetId =>
            {
                var targetUser = _userRepo.GetOne(targetId);
                var message = new Message(user.Username, msg, user.Id == targetUser.Id);
                await SocketHelper.SendStringAsync(targetUser.Socket, JsonConvert.SerializeObject(message), targetUser.Ct);
            }));
        }
    }
}
