using Proftaak.Repositories.ReactionRepo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proftaak.Repositories.HelpQuestionRepo
{
    public class HelpQuestionModel
    {
        public int id;
        public string helpSeeker;
        public int urgent;
        public string email;
        public string question;
        public List<ReactionModel> reactions;
    }
}
