using AnonPrivateChat.Middleware;
using AnonPrivateChat.Models;
using AnonPrivateChat.Repositories;
using AnonPrivateChat.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace AnonPrivateChat
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllersWithViews();

            // Dependency injections
            services.AddSingleton<IUserService, UserService>();
            services.AddSingleton<IChatService, ChatService>();
            services.AddSingleton<ISocketService, SocketService>();
            services.AddSingleton<IRepository<User>, UserRepository>();
            services.AddSingleton<IRepository<Chat>, ChatRepository>();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseHttpsRedirection();
            app.UseFileServer();
            app.UseSpaStaticFiles();

            var webSocketOptions = new WebSocketOptions()
            {
                KeepAliveInterval = TimeSpan.FromMinutes(1)
            };
            app.UseWebSockets(webSocketOptions);
            app.UseSocketMiddleware();

            app.UseRouting();
            app.UseExceptionMiddleware();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
