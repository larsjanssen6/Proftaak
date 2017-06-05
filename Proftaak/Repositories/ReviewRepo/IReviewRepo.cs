using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proftaak.Repositories.ReviewRepo
{
  public interface IReviewRepo
  {
    List<RatingModel> getRatings(int ID);
    void sendMessage(int user, int review, string text);
    void createReview(int user, int writer, string text, int rating);
  }
}
