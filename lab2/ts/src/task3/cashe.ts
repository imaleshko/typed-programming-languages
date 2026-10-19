const getLiveCount = (cache: Map<string, WeakRef<Uint8Array>>): number => {
  let count = 0;
  for (const weakRef of cache.values()) {
    if (weakRef.deref()) {
      count++;
    }
  }
  return count;
};

const cacheMain = () => {
  console.log("Кеш:");
  const weakCache = new Map();

  let keepAlive = [];

  for (let i = 0; i < 500; i++) {
    const data = new Uint8Array(1024 * 1024);
    weakCache.set("w" + i, new WeakRef(data));
    keepAlive.push(data);
  }

  console.log(`WeakRef (до GC): ${getLiveCount(weakCache)}`);

  keepAlive = [];

  setTimeout(() => {
    // @ts-ignore
    global.gc();
    console.log(`WeakRef (після GC): ${getLiveCount(weakCache)}`);
  }, 0);
};

cacheMain();
