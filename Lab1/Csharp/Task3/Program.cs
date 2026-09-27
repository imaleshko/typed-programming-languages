namespace Task3;

class Program
{
    static void Main(string[] args)
    {
        var processor = new OrderProcessor();
        var result = processor.ProcessOrderEvent(new OrderCreated("1234"));

        Console.WriteLine(result);
    }
}
