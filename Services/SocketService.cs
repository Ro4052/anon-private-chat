using AnonPrivateChat.Helpers;
using AnonPrivateChat.Models;
using AnonPrivateChat.Repositories;
using System;
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
            user.Socket = socket;
            user.Ct = ct;

            bool isSocketAlive = true;
            while (isSocketAlive)
            {
                try
                {
                    string msg = await ListenForMessage(user);
                    if (msg == null) isSocketAlive = false;
                }
                catch (Exception)
                {
                    isSocketAlive = false; 
                }
            }
        }

        private async Task<string> ListenForMessage(User user)
        {
            var msg = await SocketHelper.ReceiveStringAsync(user.Socket, user.Ct);
            if (msg != null)
            {
                Console.WriteLine("Received message:");
                Console.WriteLine(msg);
            }

            return msg;
        }
    }
}
