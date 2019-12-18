using System;
using System.Threading.Tasks;
using AnonPrivateChat.Exceptions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace AnonPrivateChat.Middleware
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch(ChatNotFoundException e)
            {
                HandleException(httpContext, StatusCodes.Status404NotFound, e);
            }
        }

        private static void HandleException(HttpContext httpContext, int statusCode, Exception e)
        {
            if(httpContext.Response.HasStarted)
            {
                throw (e);
            }

            httpContext.Response.StatusCode = statusCode;
        }
    }


    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class ExceptionMiddlewareExtensions
    {
        public static IApplicationBuilder UseExceptionMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExceptionMiddleware>();
        }
    }
}
