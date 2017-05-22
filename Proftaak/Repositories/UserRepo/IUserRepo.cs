using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proftaak.Repositories.UserRepo
{
    interface IUserRepo
    {
        bool loginEmail(string email, string passwordFilledIn);
        UserModel find(string email);
        string determineRole(UserModel user);
    }
}
