namespace Task2;

class Program
{
    static void Main(string[] args)
    {
        var cacheService = new CacheService();
        var user = cacheService.GetAndValidate<User>("{\"firstName\": \"Ivan\", \"lastName\": \"Maleshko\"}");

        Console.WriteLine(user);
    }
}
