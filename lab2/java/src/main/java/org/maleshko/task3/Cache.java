package org.maleshko.task3;

import java.lang.ref.SoftReference;
import java.util.HashMap;
import java.util.Map;
import java.util.WeakHashMap;

public class Cache {

    void main() {
        System.out.println("Кеш:");
        Map<Key, SoftReference<byte[]>> softMap = new HashMap<>();
        Map<Key, byte[]> weakMap = new WeakHashMap<>();

        for (int i = 0; i < 100; i++) {
            softMap.put(new Key("w" + i), new SoftReference<>(new byte[1024 * 1024]));
            weakMap.put(new Key("w" + i), new byte[1024 * 1024]);
        }

        System.out.println("SoftReference (до GC): " + getLiveCount(softMap));
        System.out.println("WeakHashMap (до GC): " + weakMap.size());

        System.gc();

        System.out.println("SoftReference (після GC): " + getLiveCount(softMap));
        System.out.println("WeakHashMap (після GC): " + weakMap.size());
    }

    private static int getLiveCount(Map<Key, SoftReference<byte[]>> map) {
        int count = 0;
        for (SoftReference<byte[]> ref : map.values()) {
            if (ref.get() != null) count++;
        }
        return count;
    }

    private record Key(String s) {
    }
}
