interface InternalOrderDto {
  transactionId: string;
  amount: number;
  currency: string;
}

interface PaymentRequest {
  transactionId: string;
  amount: number;
  currency: string;
}

export class PaymentProcessor {
  public static process(request: PaymentRequest): void {
    console.log(
      `Обробка платежу №${request.transactionId}, ${request.amount} ${request.currency}`,
    );
  }
}

const paymentRequest: PaymentRequest = {
  transactionId: "5af8be98-72fd-492c-ae47-02ffb976e7e3",
  amount: 1000,
  currency: "USD",
};

PaymentProcessor.process(paymentRequest);

const internalOrder: InternalOrderDto = {
  transactionId: "5af8be98-72fd-492c-ae47-02ffb976e7e3",
  amount: 1000,
  currency: "USD",
};

PaymentProcessor.process(internalOrder);

const internalOrderWithName = {
  transactionId: "5af8be98-72fd-492c-ae47-02ffb976e7e3",
  amount: 1000,
  currency: "USD",
  name: "Ivan",
};

PaymentProcessor.process(internalOrderWithName);

// PaymentProcessor.process({
//   transactionId: "5af8be98-72fd-492c-ae47-02ffb976e7e3",
//   amount: 1000,
//   currency: "USD",
//   name: "Ivan",
// });
