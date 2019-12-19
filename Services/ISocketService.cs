using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

namespace AnonPrivateChat.Services
{
    public interface ISocketService
    {
        public Task NewSocket(WebSocket socket, CancellationToken ct);
    }
}
