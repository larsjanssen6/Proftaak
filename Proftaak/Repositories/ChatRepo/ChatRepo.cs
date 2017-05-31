using Proftaak.Repositories.UserRepo;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Proftaak.Repositories.ChatRepo
{
    class ChatRepo : IChatRepo
    {
        ConnectionInterface connection;

        public ChatRepo(ConnectionInterface connection)
        {
            this.connection = connection;
        }

        public List<Chat> getChats(int ID) 
        {
            List<Chat> chats = new List<Chat>();
            connection.Connect();
            SqlCommand sqlCommand = new SqlCommand("SELECT * from CHAT WHERE status = '1' and account_one_id = @ID", connection.getConnection());
            sqlCommand.Parameters.AddWithValue("@ID", ID);
            SqlDataReader reader = sqlCommand.ExecuteReader();
            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    int userID = Convert.ToInt32(reader["ID"]);
                    int accountOne = 0;
                    int accountTwo = 0;
                    if (Convert.ToInt32(reader["account_one_id"]) == ID)
                    {
                        accountOne = Convert.ToInt32(reader["account_one_id"]);
                    }
                    else
                    {
                        accountTwo = Convert.ToInt32(reader["account_one_id"]);
                    }
                    if (Convert.ToInt32(reader["account_two_id"]) == ID)
                    {
                        accountOne = Convert.ToInt32(reader["account_two_id"]);
                    }
                    else
                    {
                        accountTwo = Convert.ToInt32(reader["account_two_id"]);
                    }

                    chats.Add(new Chat(userID, getChatUser(accountOne),
                                  getChatUser(accountTwo), Convert.ToInt32(reader["status"]), Convert.ToDateTime(reader["date_created"])));
                }
            }

          connection.disConnect();
          connection.Connect();
          sqlCommand = new SqlCommand("SELECT * from CHAT WHERE status = '1' and account_two_id = @ID", connection.getConnection());
          sqlCommand.Parameters.AddWithValue("@ID", ID);
          reader = sqlCommand.ExecuteReader();
          if (reader.HasRows)
          {
            while (reader.Read())
            {
              int userID = Convert.ToInt32(reader["ID"]);
              int accountOne = 0;
              int accountTwo = 0;
              if (Convert.ToInt32(reader["account_one_id"]) == ID)
              {
                accountOne = Convert.ToInt32(reader["account_one_id"]);
              }
              else
              {
                accountTwo = Convert.ToInt32(reader["account_one_id"]);
              }
              if (Convert.ToInt32(reader["account_two_id"]) == ID)
              {
                accountOne = Convert.ToInt32(reader["account_two_id"]);
              }
              else
              {
                accountTwo = Convert.ToInt32(reader["account_two_id"]);
              }

              chats.Add(new Chat(userID, getChatUser(accountOne),
                            getChatUser(accountTwo), Convert.ToInt32(reader["status"]), Convert.ToDateTime(reader["date_created"])));
            }
          }
          connection.disConnect();
          return chats;
        }

        public List<Chat> getAllChats()
        {
          List<Chat> chats = new List<Chat>();

          connection.Connect();
          SqlCommand sqlCommand = new SqlCommand("SELECT * from CHAT", connection.getConnection());
          SqlDataReader reader = sqlCommand.ExecuteReader();

          if (reader.HasRows)
          {
            while (reader.Read())
            {
              chats.Add(new Chat(Convert.ToInt32(reader["ID"]), getChatUser(Convert.ToInt32(reader["account_one_id"])), getChatUser(Convert.ToInt32(reader["account_two_id"]))
                  , Convert.ToInt32(reader["status"]), Convert.ToDateTime(reader["date_created"])));
            }
          }
          connection.Connect();
          return chats;
      
        }

        public UserModel getChatUser(int ID)
        {
          UserModel user = new UserModel();
          connection.Connect();
          SqlCommand sqlCommand = new SqlCommand("SELECT * from ACCOUNT where ID = @ID", connection.getConnection());
          sqlCommand.Parameters.AddWithValue("@ID", ID);
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
          connection.disConnect();
          return user;
        }

        public List<ChatReaction> getChatMessages(int id)
        {
          List<ChatReaction> messages = new List<ChatReaction>();

          connection.Connect();
          SqlCommand sqlCommand = new SqlCommand("SELECT * from CHAT_REACTION where chat_ID = @chat_ID", connection.getConnection());
          sqlCommand.Parameters.AddWithValue("@chat_ID", id);
          SqlDataReader reader = sqlCommand.ExecuteReader();
          if (reader.HasRows)
          {
            while (reader.Read())
            {
              messages.Add(new ChatReaction(Convert.ToInt32(reader["chat_ID"]), getChatUser(Convert.ToInt32(reader["account_id"])).name, reader["message"].ToString(), Convert.ToDateTime(reader["time"])));
            }
          }
          connection.disConnect();
          return messages;
        }

        public void sendMessage(int chatid, int userid, string message)
        {
          connection.Connect();
          SqlCommand sqlCommand = new SqlCommand("INSERT INTO CHAT_REACTION (account_id, chat_id, message, time) VALUES (@account_id, @chat_id, @message, @time);", connection.getConnection());
          sqlCommand.Parameters.AddWithValue("@account_id", userid);
          sqlCommand.Parameters.AddWithValue("@chat_id", chatid);
          sqlCommand.Parameters.AddWithValue("@message", message);
          sqlCommand.Parameters.AddWithValue("@time", DateTime.Now);
          sqlCommand.ExecuteNonQuery();
          connection.disConnect();

        }
        public void addChat(int IDOne, int IDTwo)
        {

          connection.Connect();
          SqlCommand sqlCommand = new SqlCommand("INSERT INTO CHAT (account_one_id, account_two_id, date_created) VALUES (@account_one_id, @account_two_id, @date_created);", connection.getConnection());
          sqlCommand.Parameters.AddWithValue("@account_one_id", IDOne);
          sqlCommand.Parameters.AddWithValue("@account_two_id", IDTwo);
          sqlCommand.Parameters.AddWithValue("@date_created", DateTime.Now);
          sqlCommand.ExecuteNonQuery();
          connection.disConnect();

        }

        public void disableChat(int ID)
        {
          connection.Connect();
          SqlCommand sqlCommand = new SqlCommand("UPDATE CHAT SET status = @status WHERE ID=@ID;", connection.getConnection());
          sqlCommand.Parameters.AddWithValue("@ID", ID);
          sqlCommand.Parameters.AddWithValue("@status", 0);
          sqlCommand.ExecuteNonQuery();
          connection.disConnect();

        }

        public void deleteChat(int ID)
        {
          connection.Connect();
          SqlCommand sqlCommand = new SqlCommand("DELETE CHAT_REACTION WHERE chat_id = @chat_ID;", connection.getConnection());
          sqlCommand.Parameters.AddWithValue("@chat_ID", ID);
          sqlCommand.ExecuteNonQuery();
          connection.disConnect();

          connection.Connect();
          sqlCommand = new SqlCommand("DELETE CHAT WHERE ID=@ID;", connection.getConnection());
          sqlCommand.Parameters.AddWithValue("@ID", ID);
          sqlCommand.ExecuteNonQuery();
          connection.disConnect();

        }
    }
}
