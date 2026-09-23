package org.maleshko;

import java.math.BigDecimal;
import java.util.Scanner;
import java.util.UUID;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Введіть суму:");
        BigDecimal amount = scanner.nextBigDecimal();

        scanner.nextLine();

        System.out.println("Введіть валюту:");
        String currency = scanner.nextLine();

        UUID transactionId = UUID.randomUUID();

        InternalOrderDTO request = new InternalOrderDTO(transactionId.toString(), amount, currency);

//        PaymentProcessor.process(request); // Помилка
        PaymentProcessor.process(from(request));
    }

    public static PaymentRequest from(InternalOrderDTO dto) {
        return new PaymentRequest(dto.transactionId(), dto.amount(), dto.currency());
    }
}
