namespace AnonPrivateChat.Models
{
    public class SentMessage
    {
        public string Username { get; private set; }
        public string Msg { get; private set; }
        public bool IsMe { get; private set; }

        public SentMessage(string username, string msg, bool isMe)
        {
            Username = username;
            Msg = msg;
            IsMe = isMe;
        }
    }
}
