using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proftaak.Repositories.UserRepo
{
    public interface IUserRepo
    {
        bool loginEmail(string email, string passwordFilledIn);
        UserModel find(string email);
        string determineRole(UserModel user);
        void register(string email, string password, string firstname, string lastname, string address, string zip, DateTime birthdate, string handicapt, string licence, string role, string number);
        List<UserModel> getUsers();
        List<UserModel> getReviewUsers();
        UserModel toggleAccount(UserModel user);
        UserModel findID(int id);
        UserModel updateUser(UserModel user);
    }
}
