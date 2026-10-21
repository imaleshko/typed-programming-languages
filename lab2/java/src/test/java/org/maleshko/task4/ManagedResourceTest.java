package org.maleshko.task4;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ManagedResourceTest {
    private File tempFile;

    @BeforeEach
    void setUp() throws IOException {
        tempFile = File.createTempFile("test_resource", ".txt");
        tempFile.deleteOnExit();
    }

    @Test
    void testReadThrowsWhenClosed() throws IOException {
        ManagedResource resource = new ManagedResource(tempFile.getAbsolutePath());
        resource.close();

        assertThrows(IllegalStateException.class, resource::read);
    }

    @Test
    void testMultipleCloseIsSafe() throws IOException {
        ManagedResource resource = new ManagedResource(tempFile.getAbsolutePath());
        resource.close();

        assertDoesNotThrow(resource::close);
    }

    @Test
    void testTryWithResourcesClosesAutomatically() throws IOException {
        ManagedResource ref;

        try (ManagedResource resource = new ManagedResource(tempFile.getAbsolutePath())) {
            ref = resource;
        }

        assertThrows(IllegalStateException.class, ref::read);
    }
}
