package org.maleshko;

import java.math.BigDecimal;

public record InternalOrderDTO(
        String transactionId,
        BigDecimal amount,
        String currency
) {
}
