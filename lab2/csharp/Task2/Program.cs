using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace Task2;

internal class Program
{
    private const int N = 1_000_000;
    private static object keepAlive;

    private static void Main()
    {
        Console.WriteLine("Теоретичні розміри:");
        Console.WriteLine($"Розмір UserStructSequential: {Unsafe.SizeOf<UserStructSequential>()} байтів");
        Console.WriteLine($"Розмір UserStructAuto: {Unsafe.SizeOf<UserStructAuto>()} байтів\n");

        Console.WriteLine("Вимірювання:");
        var classSize = MeasureMemory(() =>
        {
            var arr = new User[N];
            for (var i = 0; i < N; i++) arr[i] = new User();
            return arr;
        });
        Console.WriteLine($"Розмір 1 об'єкта User (class): {classSize} байтів");

        var classCompactSize = MeasureMemory(() =>
        {
            var arr = new UserCompact[N];
            for (var i = 0; i < N; i++) arr[i] = new UserCompact();
            return arr;
        });
        Console.WriteLine($"Розмір 1 об'єкта UserCompact (class): {classCompactSize} байтів");

        var structSequentialSize = MeasureMemory(() => new UserStructSequential[N]);
        Console.WriteLine(
            $"Розмір 1 елемента UserStructSequential (struct, Sequential): {structSequentialSize} байтів");

        var structAutoSize = MeasureMemory(() => new UserStructAuto[N]);
        Console.WriteLine($"Розмір 1 елемента UserStructAuto (struct, Auto): {structAutoSize} байтів");

        var tableSize = MeasureMemory(() => new UserTable(N));
        Console.WriteLine($"Розмір 1 об'єкта у UserTable: {tableSize} байтів");
    }

    private static long MeasureMemory(Func<object> createObjectsFunc)
    {
        GC.Collect();
        var before = GC.GetAllocatedBytesForCurrentThread();

        var array = createObjectsFunc();

        GC.Collect();
        var after = GC.GetAllocatedBytesForCurrentThread();

        keepAlive = array;
        keepAlive = null;

        return (after - before) / N;
    }

    private class User
    {
        public byte age;
        public double balance;
        public int countryCode;
        public string email;
        public long id;
        public bool isPremium;
        public long lastLogin;
    }

    private class UserCompact
    {
        public byte age;
        public double balance;
        public short countryCode;
        public int emailIndex;
        public byte flags;
        public long id;
        public long lastLogin;
    }

    [StructLayout(LayoutKind.Sequential)]
    private struct UserStructSequential
    {
        public long id;
        public byte age;
        public byte flags;
        public short countryCode;
        public long lastLogin;
        public double balance;
        public int emailIndex;
    }

    [StructLayout(LayoutKind.Auto)]
    private struct UserStructAuto
    {
        public long id;
        public byte age;
        public byte flags;
        public short countryCode;
        public long lastLogin;
        public double balance;
        public int emailIndex;
    }

    private class UserTable
    {
        public byte[] ages;
        public double[] balances;
        public short[] countryCodes;
        public int[] emailIndices;
        public byte[] flags;
        public long[] ids;
        public long[] lastLogins;


        public UserTable(int n)
        {
            ids = new long[n];
            lastLogins = new long[n];
            balances = new double[n];
            emailIndices = new int[n];
            countryCodes = new short[n];
            flags = new byte[n];
            ages = new byte[n];
        }
    }
}
