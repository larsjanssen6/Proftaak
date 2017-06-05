using Proftaak.Repositories.UserRepo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proftaak.Repositories.AgendaRepo
{
    interface IAgendaRepo
    {
    void addAppointment(DateTime date, int offerhelp, int needsHelp);
    List<AgendaModel> getSeekersAppointment(int ID);
    List<AgendaModel> getGiversAppointment(int ID);
    void updateInterview(int ID, bool Accepted);
  }
}
