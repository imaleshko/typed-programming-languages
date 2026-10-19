const DURATION = 8000;
const LIMIT = 100_000;

let temp;

const modeA = () => {
  const end = performance.now() + DURATION;

  while (performance.now() < end) {
    temp = new Uint8Array(100);
  }
};

const modeB = () => {
  const list = [];
  const end = performance.now() + DURATION;

  while (performance.now() < end && list.length < LIMIT) {
    list.push(new Uint8Array(100));
  }
};

const modeC = () => {
  const buffer = new Array(100_000);
  let i = 0;
  const end = performance.now() + DURATION;

  while (performance.now() < end) {
    buffer[i % 100_000] = new Uint8Array(100);
    i++;
  }
};

const loadGenerator = () => {
  // @ts-ignore
  global.gc();

  console.log("Режим A:");
  modeA();
  console.log("Кінець A\n");

  // @ts-ignore
  global.gc();

  console.log("Режим B:");
  modeB();
  console.log("Кінець B\n");

  // @ts-ignore
  global.gc();

  console.log("Режим C:");
  modeC();
  console.log("Кінець C\n");
};

loadGenerator();
