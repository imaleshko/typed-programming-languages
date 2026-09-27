package org.maleshko.task2;

public class Main {
    public static void main(String[] args) {
        CacheService cacheService = new CacheService();
        User user = cacheService.getAndValidate("{\"firstName\": \"Ivan\", \"lastName\": \"Maleshko\"}", User.class);

        System.out.println(user);
    }
}
