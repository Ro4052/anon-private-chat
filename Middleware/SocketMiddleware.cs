using System.Threading.Tasks;
using AnonPrivateChat.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace AnonPrivateChat.Middleware
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class SocketMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ISocketService _socketService;

        public SocketMiddleware(RequestDelegate next, ISocketService socketService)
        {
            _next = next;
            _socketService = socketService;
        }

        public async Task Invoke(HttpContext context)
        {
            if (!context.WebSockets.IsWebSocketRequest)
            {
                await _next.Invoke(context);
                return;
            }

            var ct = context.RequestAborted;
            var socket = await context.WebSockets.AcceptWebSocketAsync();

            _socketService.NewSocket(socket, ct);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class SocketMiddlewareExtensions
    {
        public static IApplicationBuilder UseSocketMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<SocketMiddleware>();
        }
    }
}
