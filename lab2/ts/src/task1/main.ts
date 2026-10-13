import Rand from "rand-seed";

const N = 1_000_000;

const main = () => {
  measure("Варіант 1 (Класи)", classes);
  measure("Варіант 2 (Значення)", values);
  measure("Варіант 3 (Boxing)", boxing);
};

const measure = (name: string, action: () => number) => {
  // @ts-ignore
  global.gc();
  const memoryBefore = process.memoryUsage().heapUsed;
  const timeBefore = performance.now();

  const result = action();

  const timeAfter = performance.now() - timeBefore;
  const memoryAfter = process.memoryUsage().heapUsed - memoryBefore;

  console.log(
    `${name}: час - ${timeAfter.toFixed(4)}, алоковано байтів - ${memoryAfter - memoryBefore}, результат - ${result}`,
  );
};

class Point {
  public x: number;
  public y: number;
  public z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

const classes = () => {
  const rand = new Rand("42");

  const points = new Array<Point>(N);

  for (let i = 0; i < N; i++) {
    points[i] = new Point(rand.next(), rand.next(), rand.next());
  }

  let sum = 0;
  for (let i = 0; i < N; i++) {
    const p = points[i];
    sum += Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
  }

  return sum / N;
};

const values = () => {
  const rand = new Rand("42");

  const points = new Float64Array(N * 3);

  for (let i = 0; i < N * 3; i += 3) {
    points[i] = rand.next();
    points[i + 1] = rand.next();
    points[i + 2] = rand.next();
  }

  let sum = 0;
  for (let i = 0; i < N * 3; i += 3) {
    sum += Math.sqrt(
      points[i] * points[i] +
        points[i + 1] * points[i + 1] +
        points[i + 2] * points[i + 2],
    );
  }

  return sum / N;
};

const boxing = () => {
  const rand = new Rand("42");

  const list = new Array(N * 3);

  for (let i = 0; i < N * 3; i++) {
    list[i] = rand.next();
  }

  let sum = 0;
  for (let i = 0; i < N * 3; i += 3) {
    const x: number = list[i];
    const y: number = list[i + 1];
    const z: number = list[i + 2];
    sum += Math.sqrt(x * x + y * y + z * z);
  }

  return sum / N;
};

main();
