using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Proftaak.Repositories.ChatRepo;
using Proftaak.Repositories.AgendaRepo;

namespace Proftaak.Controllers
{
  [Route("api/[controller]/[action]")]
  public class AgendaController : Controller 
  {
    private IAgendaRepo agendaRepo;


    public AgendaController()
    {
      agendaRepo = new AgendaRepo(new Connection());
    }
    [HttpPost]

    public IActionResult store([FromBody] dynamic appointment)
    {
      string date = appointment.date;
      DateTime time = Convert.ToDateTime(date);
      int authId = Convert.ToInt32(User.Claims.Single(c => c.Type == "userid").Value);
      int offerhelp = appointment.offersHelp;
      agendaRepo.addAppointment(time,offerhelp,authId);
      return StatusCode(200);
    }
    [HttpPost]
    public JsonResult getSeekers([FromBody] int ID)
    {
      return Json(agendaRepo.getSeekersAppointment(ID));
    }
    [HttpPost]
    public JsonResult getGivers([FromBody] int ID)
    {
      return Json(agendaRepo.getGiversAppointment(ID));
    }
    [HttpPost]
    public IActionResult update([FromBody] dynamic appointment)
    {
      try
      {
        int ID = appointment.id;
        bool accepted = appointment.accepted;
        accepted = !accepted;
        agendaRepo.updateInterview(ID, accepted);
        return StatusCode(200);
      }
      catch (Exception ex)
      {
        return StatusCode(500);
      }
    }
  }
}