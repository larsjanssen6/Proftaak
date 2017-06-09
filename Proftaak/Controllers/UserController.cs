using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Proftaak.Repositories.UserRepo;

namespace Proftaak.Controllers
{
  [Route("api/[controller]/[action]")]
  public class UserController : Controller
  {
    private IUserRepo userRepo;

    public UserController()
    {
      userRepo = new UserRepo(new Connection());
    }

    [HttpPost]
    public JsonResult getUsers()
    {
      return Json(userRepo.getUsers());
    }

    [HttpPost]
    public JsonResult GetUser([FromBody] int id)
    {
      return Json(userRepo.findID(id));
    }

    [HttpPost]
    public IActionResult update([FromBody] UserModel user)
    {
      userRepo.updateUser(user);
      return StatusCode(200);
    }

    [HttpPost]
    public IActionResult toggle([FromBody] UserModel user)
    {
      userRepo.toggleAccount(user);
      return StatusCode(200);
    }
  }
}