using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Proftaak.Repositories.HelpQuestionRepo;

namespace Proftaak.Controllers
{
    [Route("api/[controller]/[action]")]
    public class HelpQuestionController : Controller
    {
        IHelpQuestionRepo helpQuestionRepo;

        public HelpQuestionController()
        {
            helpQuestionRepo = new HelpQuestionRepo(new Connection());
        }

        [HttpPost]
        [Authorize(Roles = "Hulpbehoevende, Vrijwilliger, Hulpverlener, Beheerder")]
        public JsonResult Index()
        {
            return Json(helpQuestionRepo.index());
        }

        [HttpPost]
        [Authorize(Roles = "Hulpbehoevende, Vrijwilliger, Hulpverlener, Beheerder")]
        public IActionResult store([FromBody] HelpQuestionModel question)
        {
            int authId = Convert.ToInt32(User.Claims.Single(c => c.Type == "userid").Value);
            helpQuestionRepo.store(question, authId);
            return StatusCode(200);
        }

        [HttpPost]
        [Authorize(Roles = "Hulpbehoevende, Vrijwilliger, Hulpverlener, Beheerder")]
        public JsonResult show([FromBody] int id)
        {
          return Json(helpQuestionRepo.find(id));
        }

        [HttpPost]
        [Authorize(Roles = "Hulpverlener, Beheerder")]
        public IActionResult destroy([FromBody] HelpQuestionModel question)
        {
            helpQuestionRepo.destroy(question.id);
            return StatusCode(200);
        }
    }
}
