const longLastingTask = async (): Promise<number> => {
  const sleepTimeInMs = 3000;
  await sleep(sleepTimeInMs);
  process.stdout.write(sleepTimeInMs.toString());
  return sleepTimeInMs;
};
const evenLongerLastingTask = async (): Promise<number> => {
  const sleepTimeInMs = 6000;
  await sleep(sleepTimeInMs);
  process.stdout.write(sleepTimeInMs.toString());
  return sleepTimeInMs;
};
const lastTaskFuture = async (): Promise<string> => {
  const [longLastingTaskResult, evenLongerLastingTaskResult] = await Promise.all([
    longLastingTask(),
    evenLongerLastingTask(),
  ]);
  const sleepTimeInMs = 2000;
  await sleep(sleepTimeInMs);
  const totalWaitTime = longLastingTaskResult + evenLongerLastingTaskResult + sleepTimeInMs;
  return 'was waiting for ' + totalWaitTime + 'ms';
};

const POINT_DRAWING_INTERVAL = 500;

// self-invocation async function to make await available
(async () => {
  console.log('-> Now waiting for things to happen!');

  // draw a point every POINT_DRAWING_INTERVAL
  const interval = setInterval(() => {
    process.stdout.write('.');
  }, POINT_DRAWING_INTERVAL);

  const resultText = await lastTaskFuture();
  // "... mittels einer Methoden-Referenz in der Konsole ausgegeben"
  ((x) => x(resultText))(console.log);

  clearInterval(interval);

  console.log('-> Done.');
})();

// there is no native sleep method, so we write one and use global augmentation to make it available on the global scope
declare global {
  function sleep(ms: number): Promise<void>;
}
async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export {};
