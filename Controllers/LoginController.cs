using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entity;
using GranD_eShop.Models;

namespace GranD_eShop.Controllers
{
    public class LoginController : Controller
    {
        private readonly GranDeShopEntities contexto;
        
        public LoginController()
        {
            contexto = new GranDeShopEntities();
        }

        public JsonResult MetIniciarSesion(string contraseña, string User)
        {
            var usuario = contexto.Usuarios.FirstOrDefault(u => u.Contraseña == contraseña && u.Usuario == User);

            RespuestaModel Result = new();
            Result.Exito = (usuario != null) ? true : false;
            Result.Mensaje = User;
            return Json(Result);
        }

        public JsonResult CrearCuenta(Usuarios NuevoUsuario)
        {
            RespuestaModel Result = new();
            if (!contexto.Usuarios.Any(x => x.Usuario == NuevoUsuario.Usuario))
            {
                contexto.Usuarios.Add(NuevoUsuario);
                contexto.SaveChanges();

                Result.Exito = true;
                Result.Mensaje = "Cliente agregado correctamente.";
            }
            else
            {
                Result.Exito = false;
                Result.Mensaje = "Ya existe un cliente registrado con ese usuario.";
            }
            return Json(Result);
        }

        public IActionResult Login()
        {
            return View();
        }
        public IActionResult IniciarSesion()
        {
            return View();
        }
    }
}
