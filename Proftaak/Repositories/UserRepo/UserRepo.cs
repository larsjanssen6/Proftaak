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
    }
}
