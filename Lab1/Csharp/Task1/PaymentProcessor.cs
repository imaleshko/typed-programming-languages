namespace Task1;

public class PaymentProcessor
{
    public static void Process(PaymentRequest request)
    {
        Console.WriteLine($"Обробка платежу №{request.TransactionId}, {request.Amount} {request.Currency}");
    }
}
