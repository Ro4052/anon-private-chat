using System.IO;
using Microsoft.AspNetCore.Mvc;

namespace AnonPrivateChat.Controllers
{
    public class DefaultController : Controller
    {
        [HttpGet]
        [Route("/")]
        public IActionResult Index()
        {
            return PhysicalFile(Directory.GetCurrentDirectory() + "/ClientApp/build/index.html", "text/html");
        }

        [HttpGet]
        [Route("/dash")]
        public IActionResult Dash()
        {
            return PhysicalFile(Directory.GetCurrentDirectory() + "/ClientApp/build/index.html", "text/html");
        }

        [HttpGet]
        [Route("/chat/{id}")]
        public IActionResult Chat()
        {
            return PhysicalFile(Directory.GetCurrentDirectory() + "/ClientApp/build/index.html", "text/html");
        }
    }
}