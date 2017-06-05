using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proftaak.Repositories.ReviewRepo
{
  public class RatingModel
  {
    public int id;
    public int rating;
    public string description;
    public int owner;
    public string writer;
    public List<RatingReaction> reactions;

    public RatingModel(int id, int owner, string writer, int rating, string description, List<RatingReaction> reactions)
    {
      this.id = id;
      this.owner = owner;
      this.writer = writer;
      this.rating = rating;
      this.description = description;
      this.reactions = reactions;
    }
  }
}