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
  }
}