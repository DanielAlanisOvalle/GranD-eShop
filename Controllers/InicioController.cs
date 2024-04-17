using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GranD_eShop.Controllers
{
    public class InicioController : Controller
    {
        public IActionResult Productos()
        {
            return View();
        }
    }
}
