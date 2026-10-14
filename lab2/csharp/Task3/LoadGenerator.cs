using System.Diagnostics;

namespace Task3;

internal class LoadGenerator
{
    private const int Duration = 8000;
    private const int Limit = 100_000;
    private static byte[] temp;

    public static void Main()
    {
        GC.Collect();

        Console.WriteLine("Режим A:");
        RunMode(ModeA);
        Console.WriteLine("Кінець A\n");

        GC.Collect();

        Console.WriteLine("Режим B:");
        RunMode(ModeB);
        Console.WriteLine("Кінець B\n");

        GC.Collect();

        Console.WriteLine("Режим C:");
        RunMode(ModeC);
        Console.WriteLine("Кінець C");
    }

    private static void RunMode(Action modeFunc)
    {
        GC.Collect();

        long startGen0 = GC.CollectionCount(0);
        long startGen1 = GC.CollectionCount(1);
        long startGen2 = GC.CollectionCount(2);
        var startMem = GC.GetTotalAllocatedBytes(true);

        modeFunc();

        long endGen0 = GC.CollectionCount(0);
        long endGen1 = GC.CollectionCount(1);
        long endGen2 = GC.CollectionCount(2);
        var endMem = GC.GetTotalAllocatedBytes(true);

        Console.WriteLine("Статистика:");
        Console.WriteLine($"Gen0: {endGen0 - startGen0}");
        Console.WriteLine($"Gen1: {endGen1 - startGen1}");
        Console.WriteLine($"Gen2: {endGen2 - startGen2}");
        Console.WriteLine($"Алоковано: {(endMem - startMem) / 1024.0 / 1024.0:F2} МБ");
    }

    private static void ModeA()
    {
        var startTime = Stopwatch.GetTimestamp();
        while (Stopwatch.GetElapsedTime(startTime).TotalMilliseconds < Duration) temp = new byte[100];
    }

    private static void ModeB()
    {
        var list = new List<byte[]>();
        var startTime = Stopwatch.GetTimestamp();

        while (Stopwatch.GetElapsedTime(startTime).TotalMilliseconds < Duration && list.Count < Limit)
            list.Add(new byte[100]);
    }

    private static void ModeC()
    {
        var buffer = new byte[100_000][];
        var i = 0;
        var startTime = Stopwatch.GetTimestamp();

        while (Stopwatch.GetElapsedTime(startTime).TotalMilliseconds < Duration)
        {
            buffer[i % 100_000] = new byte[100];
            i++;
        }
    }
}
