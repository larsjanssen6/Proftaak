using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Proftaak.Repositories.HelpQuestionRepo;
using System.IO;

namespace Proftaak.Controllers
{
  [Route("api/[controller]/[action]")]
  public class HelpQuestionController : Controller
  {
    IHelpQuestionRepo helpQuestionRepo;

    public HelpQuestionController()
    {
      helpQuestionRepo = new HelpQuestionRepo(new Connection(), new ReactionRepo(new Connection()));
    }

    [HttpPost]
    [Authorize(Roles = "Hulpbehoevende, Vrijwilliger, Hulpverlener, Beheerder")]
    public JsonResult Index()
    {
      try
      {
        return Json(helpQuestionRepo.index());
      }
      catch (Exception ex)
      {
        logError(ex);
        return Json(null);
      }

    }

    [HttpPost]
    [Authorize(Roles = "Hulpbehoevende, Vrijwilliger, Hulpverlener, Beheerder")]
    public IActionResult store([FromBody] HelpQuestionModel question)
    {
      try
      {
        int authId = Convert.ToInt32(User.Claims.Single(c => c.Type == "userid").Value);
        helpQuestionRepo.store(question, authId);
        return StatusCode(200);
      }
      catch (Exception ex)
      {
        logError(ex);
        return StatusCode(500);
      }

    }

    [HttpPost]
    [Authorize(Roles = "Hulpbehoevende, Vrijwilliger, Hulpverlener, Beheerder")]
    public IActionResult update([FromBody] HelpQuestionModel question)

    {
      try
      {
        helpQuestionRepo.update(question);
        return StatusCode(200);
      }
      catch (Exception ex)
      {
        logError(ex);
        return StatusCode(500);
      }

    }

    [HttpPost]
    [Authorize(Roles = "Hulpbehoevende, Vrijwilliger, Hulpverlener, Beheerder")]
    public JsonResult show([FromBody] int id)
    {
      try
      {
        return Json(helpQuestionRepo.find(id));
      }
      catch (Exception ex)
      {
        logError(ex);
        return Json(null);
      }

    }

    [HttpPost]
    [Authorize(Roles = "Hulpverlener, Beheerder")]
    public IActionResult destroy([FromBody] HelpQuestionModel question)
    {
      try
      {
        helpQuestionRepo.destroy(question.id);
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
