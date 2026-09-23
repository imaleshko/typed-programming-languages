package org.maleshko;

public class PaymentProcessor {
    public static void process(PaymentRequest request) {
        System.out.printf("Processing payment %s, %s %s\n", request.transactionId(), request.amount(), request.currency());
    }
}
