package org.maleshko.task5;

import java.util.ArrayList;
import java.util.List;

public class TypeSystemExperiments {
    void main() {
        demonstrateErasure();
        demonstrateArrayCovariance();
        demonstrateGenericsVariance();
        demonstrateNominalTyping();
    }

    // Експеримент 1
    private static void demonstrateErasure() {
        List<String> stringList = new ArrayList<>();
        List<Integer> intList = new ArrayList<>();

        System.out.println("Стирання: " + (stringList.getClass() == intList.getClass()));

        Object obj = new ArrayList<String>();
//        boolean isStringList = obj instanceof List<String>;

        boolean isList = obj instanceof List<?>;
    }
//    private static <T> T[] createGenericArray() {
//        return new T[10];
//    }

    // Експеримент 2
    static class Animal {
    }

    static class Dog extends Animal {
    }

    static class Cat extends Animal {
    }

    private static void demonstrateArrayCovariance() {
        Dog[] dogs = new Dog[3];
        Animal[] animals = dogs;

        try {
            animals[0] = new Cat();
        } catch (ArrayStoreException e) {
            System.out.println("Помилка коваріантності масивів: " + e.toString());
        }
    }

    // Експеримент 3
    private static void demonstrateGenericsVariance() {
        List<Dog> dogsList = new ArrayList<>();
        dogsList.add(new Dog());

        List<? extends Animal> animalsList = dogsList;
        Animal animal = animalsList.get(0);

//        animalsList.add(new Cat());
//        animalsList.add(new Dog());

        List<Animal> baseAnimalList = new ArrayList<>();
        List<? super Dog> contravariantList = baseAnimalList;

        contravariantList.add(new Dog());

//        contravariantList.add(new Animal());

        Object obj = contravariantList.get(0);
    }

    // Експеримент 4
    record UserId(int id) {
    }

    record OrderId(int id) {
    }

    private static void findUser(UserId id) {
        System.out.println("Шукаємо користувача з ID: " + id.id());
    }

    private static void demonstrateNominalTyping() {
        UserId userId = new UserId(1);
        OrderId orderId = new OrderId(1);

        findUser(userId);

//        findUser(orderId);
    }
}
