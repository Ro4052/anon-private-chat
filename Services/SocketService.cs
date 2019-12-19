using AnonPrivateChat.Helpers;
using AnonPrivateChat.Models;
using AnonPrivateChat.Repositories;
using System;
using System.Net.WebSockets;
using System.Threading;

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

        public async void NewSocket(WebSocket socket, CancellationToken ct)
        {
            Console.WriteLine("New socket connected");
            var userId = new Guid(await SocketHelper.ReceiveStringAsync(socket, ct));
            var user = _userRepo.GetOne(userId);
            user.Socket = socket;
            user.Ct = ct;

            //var msg = await SocketHelper.ReceiveStringAsync(socket, ct);
            Console.WriteLine(userId);
        }
    }
}
