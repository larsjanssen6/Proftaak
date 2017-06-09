using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Proftaak;
using Proftaak.Repositories.HelpQuestionRepo;
using Proftaak.Repositories.UserRepo;
using System.Linq;

namespace Tests
{
  [TestClass]
  public class UnitTest1
  {
    [TestMethod]
    public void test_store_help_question()
    {
      Connection one = new Connection();

      HelpQuestionRepo repo = new HelpQuestionRepo(new Connection(), new ReactionRepo(new Connection()));

      //Create message

      HelpQuestionModel message = new HelpQuestionModel();
      message.question = "testmessage";
      message.helpSeeker = "135";

      int id = repo.store(message, 135);

      repo.find(id);

      Assert.IsInstanceOfType(repo.find(1), typeof(HelpQuestionModel));
    }
    [TestMethod]
    public void test_register()
    {
      IUserRepo userrepo = new UserRepo(new Connection());
      string name = RandomString(12);
      userrepo.register(name + "@unit.test", "1234", name, name, name, name, DateTime.Today, "test", "Ja", "Hulpbehoevende", "0611111111");
      bool passed = userrepo.loginEmail(name + "@unit.test", "1234");
      Assert.AreEqual(true, passed);
    }
    private static Random random = new Random();
    public static string RandomString(int length)
    {
      const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      return new string(Enumerable.Repeat(chars, length)
        .Select(s => s[random.Next(s.Length)]).ToArray());
    }
  }
}
