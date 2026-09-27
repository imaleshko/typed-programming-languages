package org.maleshko.task1;

public class PaymentProcessor {
    public static void process(PaymentRequest request) {
        System.out.printf("Обробка платежу %s, %s %s", request.transactionId(), request.amount(), request.currency());
    }
}
