using System.Diagnostics;

namespace Task1;

internal static class Program
{
    private const int N = 1_000_000;

    private static void Main()
    {
        Measure("Варіант 1 (Класи)", Classes);
        Measure("Варіант 2 (Значення)", Values);
        Measure("Варіант 3 (Boxing)", Boxing);
        Measure("Варіант 4 (Колекція обʼєктів)", Collection);
    }

    private static void Measure(string name, Func<double> action)
    {
        GC.Collect();

        var bytesBefore = GC.GetAllocatedBytesForCurrentThread();
        var gc0Before = GC.CollectionCount(0);
        var startTime = Stopwatch.GetTimestamp();

        var result = action();

        var elapsedTime = Stopwatch.GetElapsedTime(startTime);
        var bytesAfter = GC.GetAllocatedBytesForCurrentThread();
        var gc0After = GC.CollectionCount(0);

        Console.WriteLine(
            $"{name}: час - {elapsedTime}, алоковано байтів - {bytesAfter - bytesBefore}, кількість колекцій - {gc0After - gc0Before}, результат - {result}");
    }

    private static double Classes()
    {
        var random = new Random(42);
        var points = new Point[N];

        for (var i = 0; i < N; i++)
            points[i] = new Point(random.NextDouble(), random.NextDouble(), random.NextDouble());

        double sum = 0;
        for (var i = 0; i < N; i++)
        {
            var p = points[i];
            sum += Math.Sqrt(p.X * p.X + p.Y * p.Y + p.Z * p.Z);
        }

        return sum / N;
    }

    private static double Values()
    {
        var random = new Random(42);
        var points = new PointStruct[N];

        for (var i = 0; i < N; i++)
            points[i] = new PointStruct(random.NextDouble(), random.NextDouble(), random.NextDouble());

        double sum = 0;
        for (var i = 0; i < N; i++)
        {
            var p = points[i];
            sum += Math.Sqrt(p.X * p.X + p.Y * p.Y + p.Z * p.Z);
        }

        return sum / N;
    }

    private static double Boxing()
    {
        var random = new Random(42);
        var coordinates = new List<object>(N * 3);

        for (var i = 0; i < N * 3; i++) coordinates.Add(random.NextDouble());

        double sum = 0;
        for (var i = 0; i < N * 3; i += 3)
        {
            var x = (double)coordinates[i];
            var y = (double)coordinates[i + 1];
            var z = (double)coordinates[i + 2];
            sum += Math.Sqrt(x * x + y * y + z * z);
        }

        return sum / N;
    }

    private static double Collection()
    {
        var random = new Random(42);
        var points = new List<PointStruct>(N);

        for (var i = 0; i < N; i++)
            points.Add(new PointStruct(random.NextDouble(), random.NextDouble(), random.NextDouble()));

        double sum = 0;
        for (var i = 0; i < N; i++)
        {
            var p = points[i];
            sum += Math.Sqrt(p.X * p.X + p.Y * p.Y + p.Z * p.Z);
        }

        return sum / N;
    }

    private class Point(double x, double y, double z)
    {
        public readonly double X = x;
        public readonly double Y = y;
        public readonly double Z = z;
    }

    private readonly struct PointStruct(double x, double y, double z)
    {
        public double X { get; } = x;
        public double Y { get; } = y;
        public double Z { get; } = z;
    }
}
