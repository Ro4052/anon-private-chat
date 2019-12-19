using AnonPrivateChat.Exceptions;
using System;
using System.IO;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AnonPrivateChat.Helpers
{
    public class SocketHelper
    {
        public static Task SendStringAsync(WebSocket socket, string data, CancellationToken ct = default)
        {
            var buffer = Encoding.UTF8.GetBytes(data);
            var segment = new ArraySegment<byte>(buffer);
            return socket.SendAsync(segment, WebSocketMessageType.Text, true, ct);
        }

        public static async Task<string> ReceiveStringAsync(WebSocket socket, CancellationToken ct = default)
        {
            var buffer = new ArraySegment<byte>(new byte[8192]);
            var ms = new MemoryStream();

            WebSocketReceiveResult result;
            do
            {
                ct.ThrowIfCancellationRequested();

                result = await socket.ReceiveAsync(buffer, ct);
                ms.Write(buffer.Array, buffer.Offset, result.Count);
            }
            while (!result.EndOfMessage);

            ms.Seek(0, SeekOrigin.Begin);
            if (result.MessageType == WebSocketMessageType.Close)
            {
                return null;
            }
            else if (result.MessageType != WebSocketMessageType.Text)
            {
                throw new UnexpectedMessageException();
            }

            var reader = new StreamReader(ms, Encoding.UTF8);
            return await reader.ReadToEndAsync();
        }
    }
}
