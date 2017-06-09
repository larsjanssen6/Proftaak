using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Proftaak;
using Proftaak.Repositories.HelpQuestionRepo;

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
    }
}
