package org.maleshko.task1;

import java.math.BigDecimal;

public record PaymentRequest(
        String transactionId,
        BigDecimal amount,
        String currency
) {
}
