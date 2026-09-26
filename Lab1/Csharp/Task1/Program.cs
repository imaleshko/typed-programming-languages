namespace Task1;

public class Program
{
    public static void Main()
    {
        const string transactionId = "1234";
        const decimal amount = 1000m;
        const string currency = "USD";

        var request = new InternalOrderDto(transactionId, amount, currency);

        // PaymentProcessor.Process(request); // Помилка
        PaymentProcessor.Process(From(request));
    }

    private static PaymentRequest From(InternalOrderDto dto)
    {
        return new PaymentRequest(dto.TransactionId, dto.Amount, dto.Currency);
    }
}
