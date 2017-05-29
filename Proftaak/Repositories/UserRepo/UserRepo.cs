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
    public void register(string email, string password, string firstname, string lastname, string address, string zip, DateTime birthdate, string handicapt, string licence, string role, string number)
    {
      if (licence == "yes")
      {
        licence = "Ja";
      }
      else
      {
        licence = "Nee";
      }
      int roleID;
      int status = 0;
      if (role == "Hulpbehoevende")
      {
        roleID = 1;
        status = 1;
      }
      else
      {
        roleID = 2;
        status = 0;
      }
      SqlCommand firstSqlCommand = new SqlCommand("INSERT INTO ACCOUNT (role_id, email, password, name, last_name, address, zip, birthdate, rijbewijs, nummer,status) VALUES (@rank, @email, @password, @name, @last_name, @address, @zip, @birthdate, @licence, @number, @status) SELECT SCOPE_IDENTITY()", connection.getConnection());
      connection.Connect();
      firstSqlCommand.Parameters.AddWithValue("@name", firstname);
      firstSqlCommand.Parameters.AddWithValue("@address", address);
      firstSqlCommand.Parameters.AddWithValue("@zip", zip);
      firstSqlCommand.Parameters.AddWithValue("@email", email);
      firstSqlCommand.Parameters.AddWithValue("@status", status);
      firstSqlCommand.Parameters.AddWithValue("@rank", roleID);
      firstSqlCommand.Parameters.AddWithValue("@licence", licence);
      firstSqlCommand.Parameters.AddWithValue("@last_name", lastname);
      firstSqlCommand.Parameters.AddWithValue("@birthdate", birthdate.ToString("MM/dd/yyyy"));
      firstSqlCommand.Parameters.AddWithValue("@password", password);
      firstSqlCommand.Parameters.AddWithValue("@number", number);
      firstSqlCommand.Connection = connection.getConnection();
      int userId = (int)(decimal)firstSqlCommand.ExecuteScalar();


      if (handicapt != "" || handicapt != null)
      {
        int handicaptID = 1;
        switch (handicapt)
        {
          case "geen arm":
            handicaptID = 2;
            break;
          case "geen been":
            handicaptID = 1;
            break;
          case "ouderdom's problemen":
            handicaptID = 4;
            break;
          case "etc.":
            handicaptID = 2;
            break;
          default:
            break;
        }
        SqlCommand secondSqlCommand = new SqlCommand("INSERT INTO HANDICAPT_USER (account_id, handicapt_id) VALUES (@account_id, @handicapt_id);", connection.getConnection());
        secondSqlCommand.Parameters.AddWithValue("@account_id", userId);
        secondSqlCommand.Parameters.AddWithValue("@handicapt_id", handicaptID);
        secondSqlCommand.ExecuteNonQuery();
      }
      connection.disConnect();
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
