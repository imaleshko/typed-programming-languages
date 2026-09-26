namespace Task2;

public class CacheService
{
    public T GetAndValidate<T>(string json)
    {
        var parsedObj = System.Text.Json.JsonSerializer.Deserialize(json, typeof(T));
        if (parsedObj is T result) return result;
        throw new InvalidCastException($"Expected type {typeof(T).Name}");
    }
}
