using Proftaak.Repositories.ReactionRepo;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Proftaak.Repositories.HelpQuestionRepo
{
    public class ReactionRepo : IReactionRepo
    {
        ConnectionInterface connection;

        public ReactionRepo(ConnectionInterface connection)
        {
            this.connection = connection;
        }

        public List<ReactionModel> index(int id)
        {
            ReactionModel reaction;
            List<ReactionModel> reactions = new List<ReactionModel>();

            try
            {
                connection.Connect();
                SqlCommand sqlCommand = new SqlCommand("select rh.id, rh.message, a.name from reaction_help rh inner join account a on rh.account_id = a.id where rh.help_request_id = @helpRequestId", connection.getConnection());
                sqlCommand.Parameters.AddWithValue("@helpRequestId", id);

                SqlDataReader reader = sqlCommand.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        reaction = new ReactionModel();
                        reaction.id = Convert.ToInt32(reader["id"]);
                        reaction.message = reader["message"].ToString();
                        reaction.user = reader["name"].ToString();
                        reactions.Add(reaction);
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

            return reactions;
        }

        public ReactionModel find(int id)
        {
          ReactionModel reaction = new ReactionModel();

          try
          {
              connection.Connect();
              SqlCommand sqlCommand = new SqlCommand("select rh.id, rh.message, a.name from reaction_help rh inner join account a on rh.account_id = a.id where rh.id = @id", connection.getConnection());
              sqlCommand.Parameters.AddWithValue("@id", id);
              SqlDataReader reader = sqlCommand.ExecuteReader();

              if (reader.HasRows)
              {
                  while (reader.Read())
                  {
                      reaction.id = Convert.ToInt32(reader["id"]);
                      reaction.message = reader["message"].ToString();
                      reaction.user = reader["name"].ToString();
                  }
              }
          }

          catch (Exception ex)
          {
            throw;
          }

          return reaction;
        }

        public int store(ReactionModel reaction, int authId)
        {
            int id;

            try
            {
                SqlCommand sqlCommand = new SqlCommand("insert into reaction_help values(null, @helpRequestId, @accountId, @reaction) select scope_identity()", connection.getConnection());
                connection.Connect();
                sqlCommand.Parameters.AddWithValue("@helpRequestId", reaction.question_id);
                sqlCommand.Parameters.AddWithValue("@accountId", authId);
                sqlCommand.Parameters.AddWithValue("@reaction", reaction.message);

                sqlCommand.Connection = connection.getConnection();
                id = (int)(decimal)sqlCommand.ExecuteScalar();
              }

            catch (Exception)
            {
              throw;
            }

            finally
            {
              connection.disConnect();
            }

            return id;
        }

        public void update(ReactionModel reaction)
        {
            try
            {
                connection.Connect();
                SqlCommand sqlCommand = new SqlCommand("update reaction_help set message = @message where id = @id", connection.getConnection());
                sqlCommand.Parameters.AddWithValue("@id", reaction.id);
                sqlCommand.Parameters.AddWithValue("@message", reaction.message);
                sqlCommand.ExecuteNonQuery();
            }
            catch (Exception)
            {
                throw;
            }

            finally
            {
                connection.disConnect();
            }
        }

        public void destroy(int id)
        {
            try
            {
                connection.Connect();
                SqlCommand sqlCommand = new SqlCommand("delete reaction_help where id=@id;", connection.getConnection());
                sqlCommand.Parameters.AddWithValue("@id", id);
                sqlCommand.ExecuteNonQuery();
                connection.disConnect();

            }
            catch (Exception)
            {
                throw;
            }

            finally
            {
                connection.disConnect();
            }
        }
    }
}
