using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Proftaak.Repositories.AgendaRepo
{
  public class AgendaRepo : IAgendaRepo
  {
    ConnectionInterface connection;
    public AgendaRepo(ConnectionInterface connection)
    {
      this.connection = connection;
    }

    public void addAppointment(DateTime date, int needsHelp, int offersHelp)
    {
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("INSERT INTO INtroducty_talk (help_seeker_id, Account_id, date) VALUES (@seeker, @giver, @date);", connection.getConnection());

      sqlCommand.Parameters.AddWithValue("@seeker", needsHelp);
      sqlCommand.Parameters.AddWithValue("@giver", offersHelp);
      sqlCommand.Parameters.AddWithValue("@date", date);
      sqlCommand.ExecuteNonQuery();
      connection.disConnect();
    }

    public List<AgendaModel> getGiversAppointment(int ID)
    {
      List<AgendaModel> appointments = new List<AgendaModel>();
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("SELECT i.id,i.Date,i.Accepted,a.name,a.last_name from INTRODUCTY_TALK i join account a on a.id = i.account_id where i.help_seeker_id = @ID", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@ID", ID);
      SqlDataReader reader = sqlCommand.ExecuteReader();
      if (reader.HasRows)
      {
        while (reader.Read())
        {
          appointments.Add(new AgendaModel(Convert.ToInt32(reader["ID"]), Convert.ToInt32(reader["Accepted"]), Convert.ToDateTime(reader["date"]), reader["name"].ToString() + " " + reader["last_name"].ToString()));
        }
      }
      connection.disConnect();
      return appointments;
    }

    public List<AgendaModel> getSeekersAppointment(int ID)
    {
      List<AgendaModel> appointments = new List<AgendaModel>();
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("SELECT i.id,i.Date,i.Accepted,a.name,a.last_name from INTRODUCTY_TALK i join account a on a.id = i.help_seeker_id where i.account_id = @ID", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@ID", ID);
      SqlDataReader reader = sqlCommand.ExecuteReader();
      if (reader.HasRows)
      {
        while (reader.Read())
        {
          appointments.Add(new AgendaModel(Convert.ToInt32(reader["ID"]), Convert.ToInt32(reader["Accepted"]), Convert.ToDateTime(reader["date"]), reader["name"].ToString() + " " + reader["last_name"].ToString()));
        }
      }
      connection.disConnect();
      return appointments;
    }

    public void updateInterview(AgendaModel Appointment)
    {
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("Update INtroducty_talk set accepted = @accepted where ID= @ID", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@ID", Appointment.ID);
      sqlCommand.Parameters.AddWithValue("@accepted", Appointment.accepted);
      sqlCommand.ExecuteNonQuery();
      connection.disConnect();
    }
  }
}
