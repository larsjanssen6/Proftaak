using Proftaak.Repositories.UserRepo;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Proftaak.Repositories.ReviewRepo
{
  public class ReviewRepo : IReviewRepo
  {
    ConnectionInterface connection;



    public ReviewRepo()
    {
      this.connection = new Connection();
    }



    public List<RatingModel> getRatings(int ID)
    {
      List<RatingModel> ratings = new List<RatingModel>();
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("SELECT r.id,r.account_id,a.name, a.last_name, r.description,r.rating from rating r join account a  on a.id = r.help_seeker_id where r.account_id = @id", connection.getConnection());

      sqlCommand.Parameters.AddWithValue("@id", ID);

      SqlDataReader reader = sqlCommand.ExecuteReader();
      if (reader.HasRows)
      {
        while (reader.Read())
        {
          RatingModel rating = new RatingModel(Convert.ToInt32(reader["id"]), Convert.ToInt32(reader["account_id"]), reader["name"].ToString() + " " + reader["last_name"].ToString(), Convert.ToInt32(reader["rating"]), Convert.ToString(reader["description"]), getReactions(Convert.ToInt32(reader["id"])));
          ratings.Add(rating);
        }
      }
      connection.disConnect();
      return ratings;
    }

    private List<RatingReaction> getReactions(int ID)
    {
      List<RatingReaction> reactions = new List<RatingReaction>();
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("SELECT r.message, a.name, a.last_name from reaction_rating r join account a  on a.id = r.account_id where r.rating_id = @ID;", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@ID", ID);
      SqlDataReader reader = sqlCommand.ExecuteReader();

      if (reader.HasRows)
      {
        while (reader.Read())
        {
          reactions.Add(new RatingReaction(reader["name"].ToString() + " " + reader["last_name"].ToString(), reader["message"].ToString()));
        }
      }
      connection.disConnect();
      return reactions;
    }
    public void sendMessage(int user, int review, string message)
    {
      SqlCommand sqlCommand = new SqlCommand("INSERT INTO REACTION_Rating (rating_ID, account_id, message) VALUES(@rating, @account, @message);", connection.getConnection());
      connection.Connect();
      sqlCommand.Parameters.AddWithValue("@rating", review);
      sqlCommand.Parameters.AddWithValue("@account", user);
      sqlCommand.Parameters.AddWithValue("@message", message);
      sqlCommand.Connection = connection.getConnection();
      sqlCommand.ExecuteNonQuery();
      connection.disConnect();
    }

    public void createReview(int user, int writer, string text, int rating)
    {
      SqlCommand sqlCommand = new SqlCommand("INSERT INTO RATING (account_id, help_seeker_id, rating, description) VALUES(@ACCOUNT_ID, @HELP_SEEKER_ID, @RATING, @DESCRIPTION);", connection.getConnection());
      connection.Connect();
      sqlCommand.Parameters.AddWithValue("@ACCOUNT_ID", user);
      sqlCommand.Parameters.AddWithValue("@HELP_SEEKER_ID", writer);
      sqlCommand.Parameters.AddWithValue("@RATING", rating);
      sqlCommand.Parameters.AddWithValue("@DESCRIPTION", text);
      sqlCommand.Connection = connection.getConnection();
      sqlCommand.ExecuteNonQuery();
      connection.disConnect();
    }
  }
}
