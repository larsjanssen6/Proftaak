using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proftaak.Repositories.ChatRepo
{
  public class ChatReaction
  {
    public int chatID;
    public string messageSender;
    public string message;
    public DateTime time;

    public ChatReaction(int chatID, string messageSender, string message, DateTime time)
    {
      this.chatID = chatID;
      this.messageSender = messageSender;
      this.message = message;
      this.time = time;
    }
  }
}
