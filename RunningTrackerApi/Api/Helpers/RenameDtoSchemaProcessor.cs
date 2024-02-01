using NJsonSchema.Generation;

namespace Api.Helpers;

public class RenameDtoSchemaProcessor : ISchemaProcessor
{
    public void Process(SchemaProcessorContext context)
    {
        if (context.ContextualType.Type.Name.EndsWith("Dto"))
        {
            context.Schema.Title = context.ContextualType.Type.Name.Replace("Dto", string.Empty);
        }
    }
}