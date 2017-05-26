using Proftaak.Repositories.UserRepo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proftaak.Repositories.ChatRepo
{
  public interface IChatRepo
  {
    List<Chat> getChats(int ID);
    UserModel getChatUser(int ID);
    List<ChatReaction> getChatMessages(int id);
    void sendMessage(int chatid, int userid, string message);
    void addChat(int IDOne, int IDTwo);
    void disableChat(int ID);
    void deleteChat(int ID);
    List<Chat> getAllChats();
  }
}
