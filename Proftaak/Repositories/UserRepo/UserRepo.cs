using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proftaak.Repositories.UserRepo
{
    public class UserRepo : IUserRepo
    {
        ConnectionInterface connection;

        public UserRepo(ConnectionInterface connection)
        {
            this.connection = connection;
        }

        public bool loginEmail(string email, string passwordFilledIn)
        {
            bool login = false;
            string passwordDatabase = "";

            if (email == null || email == "" || passwordFilledIn == null || passwordFilledIn == "") return false;

            try
            {
                connection.Connect();
                SqlCommand sqlCommand = new SqlCommand("SELECT * from ACCOUNT where email like @email", connection.getConnection());

                sqlCommand.Parameters.AddWithValue("@email", email);
                SqlDataReader reader = sqlCommand.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                      passwordDatabase = reader["password"].ToString();
                    }
                }
            }

            catch (Exception)
            {
                throw;
            }

            finally
            {
                connection.disConnect();
            }

            if (passwordDatabase == passwordFilledIn)
            {
                login = true;
            }

            return login;
        }

        public UserModel find(string email)
        {
            UserModel user = new UserModel();

            try
            {
                connection.Connect();
                SqlCommand sqlCommand = new SqlCommand("select * from account where email=@email", connection.getConnection());
                sqlCommand.Parameters.AddWithValue("@email", email);
                SqlDataReader reader = sqlCommand.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {

                         //public int id;
                         // public string email;
                         // public int role;
                         // public string name;
                         // public string password;
                         // public string lastName;
                         // public string address;
                         // public string zip;
                         // public DateTime birthdate;
                         // public string about;
                         // public string rijbewijs;
                         // private List<HandicaptModel> handicapts;
                         // public int status;
                        user.id = Convert.ToInt32(reader["id"]);
                        user.email = reader["email"].ToString();
                        user.role = Convert.ToInt32(reader["role_id"]);
                        user.name = reader["name"].ToString();
                        user.password = reader["password"].ToString();
                        user.lastName = reader["last_name"].ToString();
                        user.address = reader["address"].ToString();
                        user.zip = reader["zip"].ToString();
                        user.birthdate = Convert.ToDateTime(reader["birthdate"]);
                        user.about = reader["about"].ToString();
                        user.rijbewijs = reader["rijbewijs"].ToString();
                        user.status = Convert.ToInt32(reader["status"]);
                    }
                }
            }

            catch (Exception ex)
            {
                throw;
            }

            return user;
        }

        public string determineRole(UserModel user)
        {
            string role_text;

            switch (user.role)
            {
              case 1:
                role_text = "Hulpbehoevende";
                break;
              case 2:
                role_text = "Vrijwilliger";
                break;
              case 3:
                role_text = "Hulpverlener";
                break;
              case 4:
                role_text = "Beheerder";
                break;
              default:
                role_text = "Error";
                break;
            }

            return role_text;
        }
    }
}
