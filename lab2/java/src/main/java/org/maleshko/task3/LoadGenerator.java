package org.maleshko.task3;

import java.util.ArrayList;
import java.util.List;

public class LoadGenerator {
    static final int DURATION = 8000;
    static final int LIMIT = 100000;

    void main() {
        System.gc();

        System.out.println("Режим A:");
        modeA();
        System.out.println("Кінець A\n");

        System.gc();

        System.out.println("Режим B:");
        modeB();
        System.out.println("Кінець B\n");

        System.gc();

        System.out.println("Режим C:");
        modeC();
        System.out.println("Кінець C");
    }

    private static void modeA() {
        long end = System.currentTimeMillis() + DURATION;
        while (System.currentTimeMillis() < end) {
            byte[] temp = new byte[100];
        }
    }

    private static void modeB() {
        List<byte[]> list = new ArrayList<>();
        long end = System.currentTimeMillis() + DURATION;
        while (System.currentTimeMillis() < end && list.size() < LIMIT) {
            list.add(new byte[100]);
        }
    }

    private static void modeC() {
        byte[][] buffer = new byte[100_000][];
        int i = 0;
        long end = System.currentTimeMillis() + DURATION;
        while (System.currentTimeMillis() < end) {
            buffer[i % 100_000] = new byte[100];
            i++;
        }
    }
}
