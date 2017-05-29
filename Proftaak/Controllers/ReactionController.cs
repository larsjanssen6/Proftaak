using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Proftaak.Repositories.HelpQuestionRepo;
using Proftaak.Repositories.ReactionRepo;

namespace Proftaak.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ReactionController : Controller
    {
        IReactionRepo reactionRepo;

        public ReactionController()
        {
            reactionRepo = new ReactionRepo(new Connection());
        }

    [HttpPost]
    [Authorize(Roles = "Hulpbehoevende, Vrijwilliger, Hulpverlener, Beheerder")]
    public IActionResult store([FromBody] ReactionModel reaction)
    {
        int authId = Convert.ToInt32(User.Claims.Single(c => c.Type == "userid").Value);
        return Json(reactionRepo.find(reactionRepo.store(reaction, authId)));
    }

    [HttpPost]
    [Authorize(Roles = "Hulpbehoevende, Vrijwilliger, Hulpverlener, Beheerder")]
    public IActionResult update([FromBody] ReactionModel reaction)
    {
        reactionRepo.update(reaction);
        return StatusCode(200);
    }

    [HttpPost]
    [Authorize(Roles = "Hulpverlener, Beheerder")]
    public IActionResult destroy([FromBody] ReactionModel reaction)
    {
        reactionRepo.destroy(reaction.id);
        return StatusCode(200);
    }
  }
}
