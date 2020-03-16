using System.IO;
using Microsoft.AspNetCore.Mvc;

namespace AnonPrivateChat.Controllers
{
    public class DefaultController : Controller
    {
        private IActionResult Index()
        {
            return PhysicalFile(Directory.GetCurrentDirectory() + "/ClientApp/build/index.html", "text/html");
        }

        [HttpGet]
        [Route("/")]
        public IActionResult Root()
        {
            return Index();
        }

        [HttpGet]
        [Route("/dash")]
        public IActionResult Dash()
        {
            return Index();
        }

        [HttpGet]
        [Route("/chat/{id}")]
        public IActionResult Chat()
        {
            return Index();
        }
    }
}