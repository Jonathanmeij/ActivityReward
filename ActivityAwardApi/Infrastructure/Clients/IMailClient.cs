namespace Infrastructure.Clients;

public interface IMailClient
{
    public void SendMail(string from, string to, string subject, string body);
}