using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proftaak.Repositories.AgendaRepo
{
    public class AgendaModel
    {
      public int ID;
      public bool accepted;
      public DateTime date;
      public string name;

    public AgendaModel(int ID, int accepted, DateTime date, string name)
    {
      this.ID = ID;
      if (accepted == 0)
      {
        this.accepted = false;
      }
      else
      {
        this.accepted = true;
      }

      this.date = date;
      this.name = name;
      }
    }

}
