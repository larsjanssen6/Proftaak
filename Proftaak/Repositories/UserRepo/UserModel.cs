using Proftaak.Repositories.HandicaptRepo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proftaak.Repositories.UserRepo
{
    public class UserModel
    {
        public int id;
        public string email;
        public int role;
        public string name;
        public string password;
        public string lastName;
        public string address;
        public string zip;
        public DateTime birthdate;
        public string about;
        public string rijbewijs;
        private List<HandicaptModel> handicapts;
        public int status;
    }
}
