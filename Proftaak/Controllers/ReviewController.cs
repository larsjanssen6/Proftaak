using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Proftaak.Repositories.UserRepo;
using Proftaak.Repositories.ReviewRepo;

namespace Proftaak.Controllers
{
  [Route("api/[controller]/[action]")]
  public class ReviewController : Controller
  {
    private IUserRepo userRepo;
    private IReviewRepo reviewRepo;

    public ReviewController()
    {
      userRepo = new UserRepo(new Connection());
      reviewRepo = new ReviewRepo();
    }

    [HttpPost]
    public JsonResult getUsers()
    {
      return Json(userRepo.getReviewUsers());
    }

    [HttpPost]
    public JsonResult getReviews([FromBody] int ID)
    {
      return Json(reviewRepo.getRatings(ID));
    }



    [HttpPost]
    public IActionResult sendReply([FromBody] dynamic message)
    {
      try
      {
        int user = Convert.ToInt32(User.Claims.Single(c => c.Type == "userid").Value);
        int review = message.review;
        string text = message.message;
        reviewRepo.sendMessage(user, review, text);
        return StatusCode(200);
      }
      catch (Exception ex)
      {
        return StatusCode(500);
      }
    }
    [HttpPost]
    public IActionResult addReview([FromBody] dynamic review)
    {
      try
      {
        int writer = Convert.ToInt32(User.Claims.Single(c => c.Type == "userid").Value);
        int user = review.user;
        string text = review.message;
        int rating = review.rating;
        reviewRepo.createReview(user, writer, text, rating);
        return StatusCode(200);
      }
      catch (Exception ex)
      {
        return StatusCode(500);
      }
    }
  }
}