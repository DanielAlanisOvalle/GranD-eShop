using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GranD_eShop.Controllers
{
    public class ExtrasController : Controller
    {
        public IActionResult Ubicacion()
        {
            return View();
        }
        public IActionResult Estadisticas()
        {
            return View();
        }
    }
}
