package org.maleshko.task5;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

public class TypedEventBus {
    private interface Event {
    }

    private record UserCreated(int userId) implements Event {
    }

    private record OrderPlaced(int orderId, double sum) implements Event {
    }

    private final Map<Class<? extends Event>, List<Consumer<Event>>> handlers = new HashMap<>();

    private <T extends Event> void subscribe(Class<T> eventType, Consumer<? super T> handler) {
        handlers.computeIfAbsent(eventType, k -> new ArrayList<>())
                .add((Consumer<Event>) handler);
    }

    private <T extends Event> void publish(T event) {
        for (Map.Entry<Class<? extends Event>, List<Consumer<Event>>> entry : handlers.entrySet()) {
            if (entry.getKey().isInstance(event)) {
                for (Consumer<Event> handler : entry.getValue()) {
                    handler.accept(event);
                }
            }
        }
    }

    void main() {
        TypedEventBus bus = new TypedEventBus();

        bus.subscribe(UserCreated.class, e ->
                System.out.println("Створено користувача з ID: " + e.userId())
        );

        bus.subscribe(Event.class, e ->
                System.out.println("Лог події: " + e.getClass().getSimpleName())
        );

        bus.publish(new UserCreated(42));
        bus.publish(new OrderPlaced(100, 250.50));

//        bus.publish("рядок");
//        bus.subscribe(UserCreated.class, (OrderPlaced e) -> System.out.println(e.orderId()));
    }
}
