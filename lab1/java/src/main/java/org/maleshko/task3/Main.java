package org.maleshko.task3;

public class Main {

    public static void main(String[] args) {
        OrderProcessor processor = new OrderProcessor();
        String status = processor.processOrderEvent(new OrderEvent.Created("1234"));

        System.out.println(status);
    }
}
