package org.maleshko.task4;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.function.Consumer;

public class FixedLeakService {
    private static class EventSource {
        private final List<Consumer<String>> handlers = new ArrayList<>();

        public void subscribe(Consumer<String> h) {
            handlers.add(h);
        }

        public void unsubscribe(Consumer<String> h) {
            handlers.remove(h);
        }
    }

    private final EventSource source = new EventSource();

    private final List<byte[]> localCache = new ArrayList<>();
    private final List<Runnable> savedActions = new ArrayList<>();

    private void processRequest(int id) {
        byte[] buffer = new byte[100 * 1024];

        if (localCache.size() >= 10) {
            localCache.clear();
        }
        localCache.add(buffer);

        Consumer<String> handler = event -> {
            System.out.println("Обробка запиту " + id + ": " + event);
        };
        source.subscribe(handler);
        source.unsubscribe(handler);

        int bufferLength = buffer.length;
        Runnable delayed = () -> {
            int length = bufferLength;
        };

        if (savedActions.size() >= 10) {
            savedActions.clear();
        }
        savedActions.add(delayed);

        File tempFile = new File("temp.txt");
        try {
            tempFile.createNewFile();
        } catch (IOException ignored) {
        }

        try (FileInputStream stream = new FileInputStream(tempFile)) {
            stream.read();
        } catch (IOException ignored) {
        }
    }

    static void main() {
        FixedLeakService service = new FixedLeakService();
        Scanner scanner = new Scanner(System.in);

        System.out.println("Початок симуляції (Виправлена версія)");
        for (int i = 0; i <= 9_000; i++) {
            service.processRequest(i);

            if (i == 0 || i == 1000 || i == 9_000) {
                System.out.println("Оброблено " + i + " запитів. Зробіть GC та знімок.");
                scanner.nextLine();
            }
        }
        System.out.println("Симуляцію завершено.");
    }
}
