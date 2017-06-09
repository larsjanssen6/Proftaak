using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Proftaak.Repositories.ChatRepo;
using System.IO;

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
      try
      {
        return Json(chatRepo.getChats(user));
      }
      catch (Exception ex)
      {
        logError(ex);
        return Json(null);
      }

    }
    [HttpPost]
    public JsonResult chatListAll()
    {
      try
      {
        return Json(chatRepo.getAllChats());
      }
      catch (Exception ex)
      {
        logError(ex);
        return Json(null);
      }

    }
    [HttpPost]
    public JsonResult messages([FromBody] int id)
    {
      try
      {
        return Json(chatRepo.getChatMessages(id));
      }
      catch (Exception ex)
      {
        logError(ex);
        return Json(null);
      }

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
    private void logError(Exception ex)
    {
      string strPath = @"error.txt";
      if (!System.IO.File.Exists(strPath))
      {
        System.IO.File.Create(strPath).Dispose();
      }
      using (StreamWriter sw = System.IO.File.AppendText(strPath))
      {
        sw.WriteLine("=============Error Logging ===========");
        sw.WriteLine("===========Start============= " + DateTime.Now);
        sw.WriteLine("Error Message: " + ex.Message);
        sw.WriteLine("Stack Trace: " + ex.StackTrace);
        sw.WriteLine("===========End============= " + DateTime.Now);
      }
    }
  }
}