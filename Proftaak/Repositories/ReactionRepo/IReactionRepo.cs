using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proftaak.Repositories.ReactionRepo
{
    public interface IReactionRepo
    {
        List<ReactionModel> index(int id);
        void update(ReactionModel reaction);
        void destroy(int id);
        int store(ReactionModel reaction, int authId);
        ReactionModel find(int id);
    }
}
