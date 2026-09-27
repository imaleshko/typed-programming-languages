package org.maleshko.task2;

public class CacheService {

    public <T> T getAndValidate(String json, Class<T> clazz) {
        Object parsedObj = parseJson(json);
//        System.out.println(parsedObj instanceof T); // Помилка
        System.out.println(clazz.isInstance(parsedObj));

//        return (T) parsedObj; // Unchecked cast: 'java.lang.Object' to 'T'
        return clazz.cast(parsedObj);
    }

    public User parseJson(String json) {
        return new User("Ivan", "Maleshko");
    }
}
