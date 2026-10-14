namespace Task3;

public class Cache
{
    public static void CacheMain()
    {
        Console.WriteLine("Кеш:");
        var weakCache = new Dictionary<string, WeakReference<byte[]>>();

        var keepAlive = new List<byte[]>();

        for (var i = 0; i < 500; i++)
        {
            var data = new byte[1024 * 1024];
            weakCache["w" + i] = new WeakReference<byte[]>(data);
            keepAlive.Add(data);
        }

        Console.WriteLine($"WeakReference (до GC): {GetLiveCount(weakCache)}");

        keepAlive.Clear();
        GC.Collect();

        Console.WriteLine($"WeakReference (після GC): {GetLiveCount(weakCache)}");
    }

    private static int GetLiveCount(Dictionary<string, WeakReference<byte[]>> cache)
    {
        var count = 0;
        foreach (var weakRef in cache.Values)
            if (weakRef.TryGetTarget(out _))
                count++;
        return count;
    }
}
