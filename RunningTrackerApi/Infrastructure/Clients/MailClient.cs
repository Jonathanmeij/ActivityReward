using System.Net.Mail;

namespace Infrastructure.Clients;

public class MailClient : IMailClient
{
    private readonly SmtpClient _smtpClient;

    public MailClient(SmtpClient smtpClient)
    {
        _smtpClient = smtpClient;
    }

    public void SendMail(string from, string to, string subject, string body)
    {
        MailMessage mailMessage = new(from, to, subject, body);
        _smtpClient.Send(mailMessage);
    }
}