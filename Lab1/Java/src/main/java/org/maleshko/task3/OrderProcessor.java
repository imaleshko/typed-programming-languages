package org.maleshko.task3;

public class OrderProcessor {

    public String processOrderEvent(OrderEvent orderEvent) {
        return switch (orderEvent) {
            case OrderEvent.Created c -> "Created: " + c.orderId();
            case OrderEvent.Paid p -> "Paid: " + p.amount();
            case OrderEvent.Shipped s -> "Shipped: " + s.trackingCode();
            case OrderEvent.Cancelled c -> "Cancelled: " + c.reason();
        };
    }
}
