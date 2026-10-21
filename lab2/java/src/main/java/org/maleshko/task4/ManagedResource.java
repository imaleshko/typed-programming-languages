package org.maleshko.task4;

import java.io.FileInputStream;
import java.io.IOException;
import java.lang.ref.Cleaner;
import java.util.Arrays;

public class ManagedResource implements AutoCloseable {
    private static final Cleaner CLEANER = Cleaner.create();
    private final Cleaner.Cleanable cleanable;

    private boolean closed = false;
    private final FileInputStream descriptor;

    public ManagedResource(String path) throws IOException {
        this.descriptor = new FileInputStream(path);

        String stackTrace = Arrays.toString(Thread.currentThread().getStackTrace());
        FileInputStream localDescriptor = this.descriptor;

        this.cleanable = CLEANER.register(this, () -> {
            System.err.println("УВАГА: ресурс не було закрито! Створено тут:\n" + stackTrace);
            try {
                localDescriptor.close();
            } catch (IOException ignored) {
            }
        });
    }

    public int read() throws IOException {
        if (closed) {
            throw new IllegalStateException("ObjectDisposedException: об'єкт уже закрито");
        }
        return descriptor.read();
    }

    @Override
    public void close() throws IOException {
        if (closed) return;

        descriptor.close();
        closed = true;
        cleanable.clean();
    }
}
