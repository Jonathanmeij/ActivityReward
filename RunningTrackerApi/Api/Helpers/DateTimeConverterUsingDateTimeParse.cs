using System.Text.Json;
using System.Text.Json.Serialization;

namespace Api.Helpers;

public class DateTimeConverterUsingDateTimeParse : JsonConverter<DateTime>
{
    private static readonly TimeZoneInfo WestInfo = TimeZoneInfo.FindSystemTimeZoneById("W. Europe Standard Time");

    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        return TimeZoneInfo.ConvertTimeFromUtc(reader.GetDateTime(), WestInfo);
    }

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToUniversalTime().ToString("o"));
    }
}