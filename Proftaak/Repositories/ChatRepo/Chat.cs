using Proftaak.Repositories.UserRepo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proftaak.Repositories.ChatRepo
{
  public class Chat
  {
    public int ID;
    public UserModel userOne;
    public UserModel userTwo;
    public bool status;
    public DateTime dateCreated;

    public Chat(int ID, UserModel userOne, UserModel userTwo, int status, DateTime dateCreated)
    {
      this.ID = ID;
      this.userOne = userOne;
      this.userTwo = userTwo;
      if (status == 1)
      {
        this.status = true;
      }
      else
      {
        this.status = false;
      }
      this.dateCreated = dateCreated;
    }
  }
}
