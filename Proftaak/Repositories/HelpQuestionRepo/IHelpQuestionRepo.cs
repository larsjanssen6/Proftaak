using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proftaak.Repositories.HelpQuestionRepo
{
    interface IHelpQuestionRepo
    {
        List<HelpQuestionModel> index();
        void destroy(int id);
        int store(HelpQuestionModel question, int authId);
        HelpQuestionModel find(int id);
        void update(HelpQuestionModel question);
    }
}



