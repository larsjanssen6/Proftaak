﻿using Proftaak.Repositories.ReactionRepo;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Proftaak.Repositories.HelpQuestionRepo
{
    public class HelpQuestionRepo : IHelpQuestionRepo
    {
        ConnectionInterface connection;
        IReactionRepo reactionRepo; 

        public HelpQuestionRepo(ConnectionInterface connection, IReactionRepo reactionRepo)
        {
            this.connection = connection;
            this.reactionRepo = reactionRepo;
        }

        public List<HelpQuestionModel> index()
        {
            HelpQuestionModel helpQuestion;
            List<HelpQuestionModel> helpQuestions = new List<HelpQuestionModel>();
            try
            {
                connection.Connect();
                SqlCommand sqlCommand = new SqlCommand("select hr.id, a.name + ' ' + a.last_name as name, a.email, hr.urgent, hr.question from help_request hr inner join account a on a.id = hr.help_seeker_id", connection.getConnection());

                SqlDataReader reader = sqlCommand.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        helpQuestion = new HelpQuestionModel();
                        helpQuestion.id = Convert.ToInt32(reader["id"]);
                        helpQuestion.helpSeeker = reader["name"].ToString();
                        helpQuestion.email = reader["email"].ToString();
                        helpQuestion.urgent = Convert.ToInt32(reader["urgent"]);
                        helpQuestion.question = reader["question"].ToString();
                        helpQuestions.Add(helpQuestion);                       
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

            return helpQuestions;
        }
        
        public HelpQuestionModel find(int id)
        {
            HelpQuestionModel question = new HelpQuestionModel();

            try
            {
                connection.Connect();
                SqlCommand sqlCommand = new SqlCommand("select hr.id, hr.question, hr.urgent, a.name from help_request hr inner join account a on hr.help_seeker_id = a.id where hr.id = @id", connection.getConnection());
                sqlCommand.Parameters.AddWithValue("@id", id);
                SqlDataReader reader = sqlCommand.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        question.id = Convert.ToInt32(reader["id"]);
                        question.helpSeeker = reader["name"].ToString();
                        question.urgent = Convert.ToInt32(reader["urgent"]);
                        question.question = reader["question"].ToString();
                    }
                }
            }

            catch (Exception ex)
            {
                throw;
            }

            question.reactions = reactionRepo.index(question.id);

            return question;
        }

        public int store(HelpQuestionModel question, int authId)
        {
            int id;

            try
            {
                SqlCommand sqlCommand = new SqlCommand("insert into help_request (help_seeker_id, urgent, question) VALUES (@help_seeker_id, @urgent, @question) select scope_identity()", connection.getConnection());
                connection.Connect();
                sqlCommand.Parameters.AddWithValue("@help_seeker_id", authId);
                sqlCommand.Parameters.AddWithValue("@urgent", question.urgent);
                sqlCommand.Parameters.AddWithValue("@question", question.question);

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

        public void update(HelpQuestionModel question)
        {
            try
            {
                connection.Connect();
                SqlCommand sqlCommand = new SqlCommand("update help_request set question = @question, urgent = @urgent where id = @id", connection.getConnection());
                sqlCommand.Parameters.AddWithValue("@id", question.id);
                sqlCommand.Parameters.AddWithValue("@question", question.question);
                sqlCommand.Parameters.AddWithValue("@urgent", question.urgent);
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
                SqlCommand sqlCommand = new SqlCommand("delete help_request where id=@id;", connection.getConnection());
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
