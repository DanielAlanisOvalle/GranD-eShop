using GranD_eShop.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Entity;
using System.Threading.Tasks;

namespace GranD_eShop.Controllers
{
    public class PedidosController : Controller
    {
        private readonly GranDeShopEntities contexto;
        public PedidosController()
        {
            contexto = new GranDeShopEntities();
        }
        [HttpPost]
        public List<EncabezadoPedidos> ObtenerPedidos([FromBody] string Usuario)
        {
            List<EncabezadoPedidos> Pedidos = contexto.EncabezadoPedidos.Where(x => x.UsuarioPedido == Usuario).ToList();
            return Pedidos;
        }

        [HttpPost]
        public List<DetallePedidos> ObtenerImagenesPedido([FromBody] string Pedido)
        {
            List<DetallePedidos> Pedidos = contexto.DetallePedidos.Where(x => x.NumeroPedido == Pedido).ToList();
            return Pedidos;
        }

        [HttpPost]
        public List<ObtenerDatosPedido_Result> DetallePedido([FromBody] string PedidoSeleccionado)
        {
            List<ObtenerDatosPedido_Result> Result = contexto.ObtenerDatosPedido(PedidoSeleccionado).ToList();
            return Result;
        }
        public IActionResult Pedidos()
        {
            return View();
        }

        public IActionResult DetallePedido()
        {
            return View();
        }

    }
}
