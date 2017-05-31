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
    public int nummer;


    public UserModel()
    {
      // old constructor to create a new user (with the promise of defining him/her later)
    }

    public UserModel(int ID, string email, int role, string name, string lastName, string address, string zip, DateTime birthdate, string about, int status, string rijbewijs, int nummer)
    {
      // new constructor to allow on-load defining of user lists
      this.id = ID;
      this.email = email;
      this.role = role;
      this.name = name;
      this.lastName = lastName;
      this.address = address;
      this.zip = zip;
      this.birthdate = birthdate;
      this.about = about;
      this.status = status;
      this.nummer = nummer;
      this.rijbewijs = rijbewijs;
    }
  }
}
