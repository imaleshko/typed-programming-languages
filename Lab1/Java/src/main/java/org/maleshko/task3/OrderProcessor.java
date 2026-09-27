package org.maleshko.task3;

public class OrderProcessor {

    public String processOrderEvent(OrderEvent orderEvent) {
        return switch (orderEvent) {
            case OrderEvent.Created c -> "Створено: " + c.orderId();
            case OrderEvent.Paid p -> "Оплачено: " + p.amount();
            case OrderEvent.Shipped s -> "Відправлено: " + s.trackingCode();
            case OrderEvent.Cancelled c -> "Скасовано: " + c.reason();
            case OrderEvent.Refunded r -> "Повернено: " + r.reason();
        };
    }
}
