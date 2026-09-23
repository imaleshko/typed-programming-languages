package org.maleshko;

import java.math.BigDecimal;

public record PaymentRequest(
        String transactionId,
        BigDecimal amount,
        String currency
) {
}
