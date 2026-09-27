package org.maleshko.task1;

import java.math.BigDecimal;

public record InternalOrderDTO(
        String transactionId,
        BigDecimal amount,
        String currency
) {
}
