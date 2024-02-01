namespace Common;

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime Now
    {
        get => DateTime.Now;
        set { }
    }
}