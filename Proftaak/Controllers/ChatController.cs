using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Proftaak.Repositories.ChatRepo;

namespace Proftaak.Controllers
{
  [Route("api/[controller]/[action]")]
  public class ChatController : Controller
  {
    private IChatRepo chatRepo;


    public ChatController()
    {
      chatRepo = new ChatRepo(new Connection());
    }

    [HttpPost]
    public JsonResult chatList([FromBody] int user)
    {
      return Json(chatRepo.getChats(user));
    }
    [HttpPost]
    public JsonResult chatListAll()
    {
      return Json(chatRepo.getAllChats());
    }
    [HttpPost]
    public JsonResult messages([FromBody] int id)
    {
      return Json(chatRepo.getChatMessages(id));
    }
    [HttpPost]
    public void disableChat([FromBody] int id)
    {
      chatRepo.disableChat(id);
    }
    [HttpPost]
    public void deleteChat([FromBody] int id)
    {
      chatRepo.deleteChat(id);
    }
    [HttpPost]
    public void sendMessage([FromBody] dynamic message)
    {
      int chatid = message.chatid;
      int userid = message.userid;
      string messagetext = message.message;
      chatRepo.sendMessage(chatid, userid, messagetext);
    }
    [HttpPost]
    public void createChat([FromBody] dynamic users)
    {
      int one = users.one;
      int two = users.two;
      chatRepo.addChat(one, two);
    }
  }
}