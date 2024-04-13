using GranD_eShop.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace GranD_eShop.Controllers
{
    public class PedidosController : Controller
    {
        private readonly ILogger<PedidosController> _logger;

        public PedidosController(ILogger<PedidosController> logger)
        {
            _logger = logger;
        }
        public IActionResult Pedidos()
        {
            return View();
        }
        public IActionResult DetallePedido()
        {
            return View();
        }
        [HttpPost]
        public void ObtieneNumeroPedido([FromBody] PedidosModels.Pedidos pedidos)
        {
            string resultado = pedidos.NumeroPedido;
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
