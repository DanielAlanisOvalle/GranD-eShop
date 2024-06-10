using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GranD_eShop.Models;
using Entity;

namespace GranD_eShop.Controllers
{
    public class CarritoController : Controller
    {
        private readonly GranDeShopEntities contexto;
        public CarritoController()
        {
            contexto = new GranDeShopEntities();
        }
        public void CrearEncabezado(EncabezadoPedidos Enca)
        {
            Enca.Fecha = DateTime.Now;
            contexto.EncabezadoPedidos.Add(Enca);
            contexto.SaveChanges();
        }
        [HttpPost]
        public void CrearDetalle(DetallePedidos Detalles)
        {
            Detalles.Fecha = DateTime.Now;
            contexto.DetallePedidos.Add(Detalles);
            contexto.SaveChanges();
        }
        public IActionResult Carrito()
        {
            return View();
        }
    }
}
