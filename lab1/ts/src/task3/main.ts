type OrderEvent =
  | { kind: "created"; orderId: string }
  | { kind: "paid"; orderId: string; amount: number }
  | { kind: "shipped"; orderId: string; trackingCode: string }
  | { kind: "cancelled"; orderId: string; reason: string }
  | { kind: "refunded"; orderId: string; amount: number };

function processEvent(event: OrderEvent): string {
  switch (event.kind) {
    case "created":
      return `Створено: ${event.orderId}`;
    case "paid":
      return `Оплачено: ${event.amount}`;
    case "shipped":
      return `Відправлено: ${event.trackingCode}`;
    case "cancelled":
      return `Скасовано: ${event.reason}`;
    case "refunded":
      return `Повернено: ${event.amount}`;
    default: {
      const _exhaustiveCheck: never = event;
      return _exhaustiveCheck;
    }
  }
}

const orderStatus = processEvent({ kind: "created", orderId: "1234" });
console.log(orderStatus);
