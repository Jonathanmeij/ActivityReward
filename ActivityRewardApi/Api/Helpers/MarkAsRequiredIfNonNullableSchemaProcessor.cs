using NJsonSchema;
using NJsonSchema.Generation;

namespace Api.Helpers;

public class MarkAsRequiredIfNonNullableSchemaProcessor : ISchemaProcessor
{
    public void Process(SchemaProcessorContext context)
    {
        foreach ((string _, JsonSchemaProperty? prop) in context.Schema.Properties)
        {
            if (!prop.IsNullable(SchemaType.OpenApi3))
            {
                prop.IsRequired = true;
            }
        }
    }
}
