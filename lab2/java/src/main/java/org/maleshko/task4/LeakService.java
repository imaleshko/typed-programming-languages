package org.maleshko.task4;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.function.Consumer;

public class LeakService {
    private static class EventSource {
        private final List<Consumer<String>> handlers = new ArrayList<>();

        public void subscribe(Consumer<String> h) {
            handlers.add(h);
        }
    }

    private final EventSource source = new EventSource();

    private static final List<byte[]> CACHE = new ArrayList<>();
    private final List<Runnable> savedActions = new ArrayList<>();

    private void processRequest(int id) {
        byte[] buffer = new byte[100 * 1024];

        CACHE.add(buffer);

        source.subscribe(event -> {
            System.out.println("Обробка запиту " + id + ": " + event);
        });

        Runnable delayed = () -> {
            int length = buffer.length;
        };
        savedActions.add(delayed);

        try {
            File tempFile = new File("temp.dat");
            tempFile.createNewFile();
            FileInputStream stream = new FileInputStream(tempFile);
            stream.read();
        } catch (IOException e) {
        }
    }

    static void main() {
        LeakService service = new LeakService();
        Scanner scanner = new Scanner(System.in);

        System.out.println("Початок симуляції");
        for (int i = 0; i < 10_000; i++) {
            service.processRequest(i);

            if (i == 0 || i == 1000 || i == 9_000) {
                System.out.println("Оброблено " + i + " запитів");
                scanner.nextLine();
            }
        }
        System.out.println("Симуляцію завершено.");
    }
}
