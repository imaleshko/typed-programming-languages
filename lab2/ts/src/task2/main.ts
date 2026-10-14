const N = 1_000_000;
let keepAlive = null;

class User {
  id: bigint;
  age: number;
  isPremium: boolean;
  countryCode: number;
  lastLogin: bigint;
  balance: number;
  email: string;

  constructor() {
    this.id = 0n;
    this.age = 0;
    this.isPremium = false;
    this.countryCode = 0;
    this.lastLogin = 0n;
    this.balance = 0.0;
    this.email = "";
  }
}

class UserCompact {
  id: bigint;
  lastLogin: bigint;
  balance: number;
  emailIndex: number;
  countryCode: number;
  flags: number;
  age: number;

  constructor() {
    this.id = 0n;
    this.lastLogin = 0n;
    this.balance = 0.0;
    this.emailIndex = 0;
    this.countryCode = 0;
    this.flags = 0;
    this.age = 0;
  }
}

class UserTable {
  ids: BigInt64Array;
  lastLogins: BigInt64Array;
  balances: Float64Array;
  emailIndices: Int32Array;
  countryCodes: Int16Array;
  flags: Int8Array;
  ages: Int8Array;

  constructor(n: number) {
    this.ids = new BigInt64Array(n);
    this.lastLogins = new BigInt64Array(n);
    this.balances = new Float64Array(n);
    this.emailIndices = new Int32Array(n);
    this.countryCodes = new Int16Array(n);
    this.flags = new Int8Array(n);
    this.ages = new Int8Array(n);
  }
}

function measureMemory(createObjectsFunc: () => unknown, n: number): number {
  // @ts-ignore
  global.gc();

  const before = process.memoryUsage();

  const array = createObjectsFunc();

  // @ts-ignore
  global.gc();

  const after = process.memoryUsage();

  const heapDifference = after.heapUsed - before.heapUsed;
  const bufDifference = after.arrayBuffers - before.arrayBuffers;

  keepAlive = array;
  keepAlive = null;

  return (heapDifference + bufDifference) / n;
}

function testHiddenClasses() {
  // @ts-ignore
  global.gc();
  const beforeSame = process.memoryUsage().heapUsed;
  const arraySame = new Array(N);
  for (let i = 0; i < N; i++) {
    // @ts-ignore
    const o: Record<string, number> = {};
    o.a = i;
    o.b = 2;
    o.c = 3;
    arraySame[i] = o;
  }

  // @ts-ignore
  global.gc();
  const memorySame = (process.memoryUsage().heapUsed - beforeSame) / N;

  // @ts-ignore
  global.gc();
  const beforeDifferent = process.memoryUsage().heapUsed;
  const arrayDifferent = new Array(N);
  for (let i = 0; i < N; i++) {
    const o: Record<string, number> = {};
    if (i % 2 === 0) {
      o.a = i;
      o.b = 2;
      o.c = 3;
    } else {
      o.c = 3;
      o.b = 2;
      o.a = i;
    }
    arrayDifferent[i] = o;
  }

  // @ts-ignore
  global.gc();
  const memoryDiff = (process.memoryUsage().heapUsed - beforeDifferent) / N;

  let sum1 = 0;
  const t0 = performance.now();
  for (let i = 0; i < N; i++) {
    sum1 += arraySame[i].a;
  }
  const t1 = performance.now();

  let sum2 = 0;
  const t2 = performance.now();
  for (let i = 0; i < N; i++) {
    sum2 += arrayDifferent[i].a;
  }
  const t3 = performance.now();

  console.log("Однаковий порядок");
  console.log(`Пам'ять: ${Math.round(memorySame)} байтів/об'єкт`);
  console.log(`Час доступу до o.a: ${(t1 - t0).toFixed(2)} мс`);

  console.log("Різний порядок");
  console.log(`Пам'ять: ${Math.round(memoryDiff)} байтів/об'єкт`);
  console.log(`Час доступу до o.a: ${(t3 - t2).toFixed(2)} мс`);
}

function main() {
  const classSize = measureMemory(() => {
    const arr = new Array(N);
    for (let i = 0; i < N; i++) {
      arr[i] = new User();
    }
    return arr;
  }, N);
  console.log(`Розмір 1 об'єкта User: ${Math.round(classSize)} байтів`);

  const compactSize = measureMemory(() => {
    const arr = new Array(N);
    for (let i = 0; i < N; i++) {
      arr[i] = new UserCompact();
    }
    return arr;
  }, N);
  console.log(
    `Розмір 1 об'єкта UserCompact: ${Math.round(compactSize)} байтів`,
  );

  const tableSize = measureMemory(() => new UserTable(N), N);
  console.log(`Розмір 1 об'єкта у UserTable: ${Math.round(tableSize)} байтів`);

  console.log("Тестування hidden classes");
  testHiddenClasses();
}

main();
