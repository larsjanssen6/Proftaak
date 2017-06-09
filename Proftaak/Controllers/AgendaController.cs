using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Proftaak.Repositories.ChatRepo;
using Proftaak.Repositories.AgendaRepo;
using System.IO;

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
      try
      {
        string date = appointment.date;
        DateTime time = Convert.ToDateTime(date);
        int authId = Convert.ToInt32(User.Claims.Single(c => c.Type == "userid").Value);
        int offerhelp = appointment.offersHelp;
        agendaRepo.addAppointment(time, offerhelp, authId);
        return StatusCode(200);
      }
      catch (Exception ex)
      {
        logError(ex);
        return StatusCode(500);
      }

    }
    [HttpPost]
    public JsonResult getSeekers([FromBody] int ID)
    {
      try
      {
        return Json(agendaRepo.getSeekersAppointment(ID));
      }
      catch (Exception ex)
      {
        logError(ex);
        return Json(null);
      }

    }
    [HttpPost]
    public JsonResult getGivers([FromBody] int ID)
    {
      try
      {
        return Json(agendaRepo.getGiversAppointment(ID));
      }
      catch (Exception ex)
      {
        logError(ex);
        return Json(null);
      }

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
        logError(ex);
        return StatusCode(500);
      }
    }

    private void logError(Exception ex)
    {
      string strPath = @"error.txt";
      if (!System.IO.File.Exists(strPath))
      {
        System.IO.File.Create(strPath).Dispose();
      }
      using (StreamWriter sw = System.IO.File.AppendText(strPath))
      {
        sw.WriteLine("=============Error Logging ===========");
        sw.WriteLine("===========Start============= " + DateTime.Now);
        sw.WriteLine("Error Message: " + ex.Message);
        sw.WriteLine("Stack Trace: " + ex.StackTrace);
        sw.WriteLine("===========End============= " + DateTime.Now);
      }
    }
  }
}