namespace Task3;

public abstract record OrderEvent;

public record OrderCreated(string OrderId) : OrderEvent;

public record OrderPaid(string OrderId, decimal Amount) : OrderEvent;

public record OrderShipped(string OrderId, string TrackingCode) : OrderEvent;

public record OrderCancelled(string OrderId, string Reason) : OrderEvent;

public record OrderRefunded(string OrderId, string Reason) : OrderEvent;

public class OrderProcessor
{
    public string ProcessOrderEvent(OrderEvent orderEvent)
    {
        return orderEvent switch
        {
            OrderCreated c => $"Створено: {c.OrderId}",
            OrderPaid p => $"Оплачено: {p.Amount}",
            OrderShipped s => $"Відправлено: {s.TrackingCode}",
            OrderCancelled c => $"Скасовано: {c.Reason}",
            OrderRefunded r => $"Повернено: {r.Reason}",
            _ => throw new Exception("Невідома подія")
        };
    }
}
