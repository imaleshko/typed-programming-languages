namespace Task1;

public class Program
{
    public static void Main()
    {
        Console.WriteLine("Введіть суму:");
        var amount = decimal.Parse(Console.ReadLine() ?? "0");

        Console.WriteLine("Введіть валюту:");
        var currency = Console.ReadLine() ?? "EUR";

        var transactionId = Guid.NewGuid();

        var request = new InternalOrderDto(transactionId.ToString(), amount, currency);

        // PaymentProcessor.Process(request); // Помилка
        PaymentProcessor.Process(From(request));
    }

    private static PaymentRequest From(InternalOrderDto dto)
    {
        return new PaymentRequest(dto.TransactionId, dto.Amount, dto.Currency);
    }
}