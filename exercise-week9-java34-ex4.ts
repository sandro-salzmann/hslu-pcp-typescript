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

// // But pay attention: Javascript is single-threaded! It uses one thread to run all code.
// (async () => {
//   const longBlockingTask = async () => {
//     let y = 0;
//     for (let i = 0; i < 2_500_000_000; i++) {
//       y += 1;
//       if (y % 1_000_000 === 0) {
//         process.stdout.write('.');
//       }
//     }
//   };
//   const shortTask = async () =>
//     new Promise<void>((resolve) =>
//       setTimeout(() => {
//         console.log('Sort Task finished');
//         resolve();
//       }, 2000),
//     );

//   await Promise.all([shortTask(), longBlockingTask()]);
// })();
// // 'Sort Task finished' doesn't print after 2 seconds because longBlockingTask has a long "CPU-Bound Blocking" synchronous code.
// // Only through "asynchronous non-blocking I/O" (async-await/Promises + event loop) the one thread can do other things instead of synchronously waiting for events.
// // => That's why waiting for timeouts and intervals (and network etc.) doesn't block the entire app.

// // Remember: Async functions are only "really" async if ...
// //  - they call either async functions
// //  - or perform an async I/O operation
// //  - or perform synchronous code (CPU-Bound Blocking) on another thread (Worker Threads, e.g. Node Worker on Node.JS or Service Worker on Web)

// // More here: https://betterprogramming.pub/why-just-using-async-await-and-promises-doesnt-make-your-code-asynchronous-e8ee9014d92e
