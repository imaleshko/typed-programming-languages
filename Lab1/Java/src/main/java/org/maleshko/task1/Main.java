package org.maleshko.task1;

import java.math.BigDecimal;

public class Main {
    public static void main(String[] args) {
        final String transactionId = "1234";
        final BigDecimal amount = new BigDecimal(1000);
        final String currency = "USD";

        InternalOrderDTO request = new InternalOrderDTO(transactionId, amount, currency);

//        PaymentProcessor.process(request); // Помилка
        PaymentProcessor.process(from(request));
    }

    public static PaymentRequest from(InternalOrderDTO dto) {
        return new PaymentRequest(dto.transactionId(), dto.amount(), dto.currency());
    }
}
