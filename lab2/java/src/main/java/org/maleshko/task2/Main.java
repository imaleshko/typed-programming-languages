package org.maleshko.task2;

import java.util.function.Supplier;

public class Main {
    static final int N = 1_000_000;
    static Object keepAlive;

    void main() {
        long userSize = measureMemory(() -> {
            User[] users = new User[N];
            for (int i = 0; i < N; i++) {
                users[i] = new User();
            }
            return users;
        }, N);

        System.out.println("Розмір 1 об'єкта User: " + userSize + " байтів");

        long compactUserSize = measureMemory(() -> {
            UserCompact[] users = new UserCompact[N];
            for (int i = 0; i < N; i++) {
                users[i] = new UserCompact();
            }
            return users;
        }, N);

        System.out.println("Розмір 1 об'єкта UserCompact: " + compactUserSize + " байтів");

        long tableSize = measureMemory(() -> new UserTable(N), N);
        System.out.println("Розмір 1 об'єкта у UserTable: " + tableSize + " байтів");
    }

    private static long measureMemory(Supplier<Object> createObjectsFunc, int n) {
        System.gc();
        Runtime runtime = Runtime.getRuntime();
        long memoryBefore = runtime.totalMemory() - runtime.freeMemory();

        Object array = createObjectsFunc.get();
        System.gc();

        long memoryAfter = runtime.totalMemory() - runtime.freeMemory();

        keepAlive = array;
        keepAlive = null;

        return (memoryAfter - memoryBefore) / n;
    }

    private static class User {
        long id;
        byte age;
        boolean isPremium;
        int countryCode;
        long lastLogin;
        double balance;
        String email;
    }

    private static class UserCompact {
        long id;
        long lastLogin;
        double balance;
        int emailIndex;
        short countryCode;
        byte flags;
        byte age;
    }

    static class UserTable {
        long[] ids;
        long[] lastLogins;
        double[] balances;
        int[] emailIndices;
        short[] countryCodes;
        byte[] flags;
        byte[] ages;

        public UserTable(int n) {
            ids = new long[n];
            lastLogins = new long[n];
            balances = new double[n];
            emailIndices = new int[n];
            countryCodes = new short[n];
            ages = new byte[n];
            flags = new byte[n];
        }

        public void add(int i, long id, long lastLogin,
                        double balance, int emailIndex,
                        short countyCode, byte age, byte flag) {
            ids[i] = id;
            lastLogins[i] = lastLogin;
            balances[i] = balance;
            emailIndices[i] = emailIndex;
            countryCodes[i] = countyCode;
            ages[i] = age;
            flags[i] = flag;
        }

        public double averageBalance(short countryCode) {
            double sum = 0;
            int count = 0;

            for (int i = 0; i < N; i++) {
                if (countryCodes[i] == countryCode) {
                    sum += balances[i];
                    count++;
                }
            }

            return count > 0 ? sum / count : 0;
        }
    }
}
