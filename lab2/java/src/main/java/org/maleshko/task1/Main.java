package org.maleshko.task1;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.function.Supplier;

public class Main {
    static Random random = new Random(42);
    static final int N = 1_000_000;

    static void main() {
        measure("Варіант 1 (Класи)", Main::classes);
        measure("Варіант 2 (Значення)", Main::values);
        measure("Варіант 3 (Boxing)", Main::boxing);
        measure("Варіант 4 (Колекція обʼєктів)", Main::collection);
    }

    private static void measure(String name, Supplier<Double> action) {
        random.setSeed(42);
        System.gc();

        Runtime runtime = Runtime.getRuntime();
        long memoryBefore = runtime.totalMemory() - runtime.freeMemory();
        long timeBefore = System.currentTimeMillis();

        double result = action.get();

        long memoryAfter = runtime.totalMemory() - runtime.freeMemory();
        long timeAfter = System.currentTimeMillis();

        System.out.println(name + ": час - " + (timeAfter - timeBefore)
                + ", алоковано байтів - " + (memoryAfter - memoryBefore)
                + ", результат - " + result);
    }

    record Point(double x, double y, double z) {
    }

    private static double classes() {
        Point[] points = new Point[N];

        for (int i = 0; i < N; i++) {
            points[i] = new Point(random.nextDouble(), random.nextDouble(), random.nextDouble());
        }

        double sum = 0;
        for (int i = 0; i < N; i++) {
            Point p = points[i];
            sum += Math.sqrt(p.x() * p.x() + p.y() * p.y() + p.z() * p.z());
        }

        return sum / N;
    }

    private static double values() {
        double[] xs = new double[N];
        double[] ys = new double[N];
        double[] zs = new double[N];

        for (int i = 0; i < N; i++) {
            xs[i] = random.nextDouble();
            ys[i] = random.nextDouble();
            zs[i] = random.nextDouble();
        }

        double sum = 0;
        for (int i = 0; i < N; i++) {
            sum += Math.sqrt(xs[i] * xs[i] + ys[i] * ys[i] + zs[i] * zs[i]);
        }

        return sum / N;
    }

    private static double boxing() {
        List<Double> coordinates = new ArrayList<>(N * 3);

        for (int i = 0; i < N * 3; i++) {
            coordinates.add(random.nextDouble());
        }

        double sum = 0;
        for (int i = 0; i < N * 3; i += 3) {
            double x = coordinates.get(i);
            double y = coordinates.get(i + 1);
            double z = coordinates.get(i + 2);
            sum += Math.sqrt(x * x + y * y + z * z);
        }

        return sum / N;
    }

    private static double collection() {
        List<Point> points = new ArrayList<>(N);

        for (int i = 0; i < N; i++) {
            points.add(new Point(random.nextDouble(), random.nextDouble(), random.nextDouble()));
        }

        double sum = 0;
        for (int i = 0; i < N; i++) {
            Point p = points.get(i);
            sum += Math.sqrt(p.x() * p.x() + p.y() * p.y() + p.z() * p.z());
        }

        return sum / N;
    }
}
