using System;

namespace AnonPrivateChat.Parsers
{
    public class InitChatParser
    {
        private string _userId;
        private string _chatId;

        public string UserId
        {
            set
            {
                _userId = value;
            }
        }
        
        public string ChatId
        {
            set
            {
                _chatId = value;
            }
        }

        public Guid? GetParsedUserId()
        {
            return _userId == null ? (Guid?)null : new Guid(_userId);
        }

        public Guid GetParsedChatId()
        {
            return new Guid(_chatId);
        }
    }
}
