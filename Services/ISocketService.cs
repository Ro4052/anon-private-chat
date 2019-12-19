using System.Net.WebSockets;
using System.Threading;

namespace AnonPrivateChat.Services
{
    public interface ISocketService
    {
        public void NewSocket(WebSocket socket, CancellationToken ct);
    }
}
