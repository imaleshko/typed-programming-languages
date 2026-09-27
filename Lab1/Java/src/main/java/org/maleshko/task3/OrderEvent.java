package org.maleshko.task3;

public sealed interface OrderEvent {
    record Created(String orderId) implements OrderEvent {
    }

    record Paid(String orderId, double amount) implements OrderEvent {
    }

    record Shipped(String orderId, String trackingCode) implements OrderEvent {
    }

    record Cancelled(String orderId, String reason) implements OrderEvent {
    }
}
