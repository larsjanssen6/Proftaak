using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proftaak.Repositories.ReviewRepo
{
  public class RatingReaction
  {
    public string name;
    public string message;
    public RatingReaction(string name, string message)
    {
      this.name = name;
      this.message = message;
    }
  }
}
