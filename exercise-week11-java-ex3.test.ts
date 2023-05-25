import { factorialArr, factorialFor, factorialRec } from "./exercise-week11-java-ex3";
import { f100, f1000, f10000 } from "./factorial";


describe("testFactorialFor", () => {
  it.each([
    [0n, 1n], [1n, 1n], [2n, 2n],
    [3n, 6n], [4n, 24n], [5n, 120n],
    [6n, 720n], [7n, 5040n], [8n, 40320n],
    [9n, 362880n], [10n, 3628800n],
    [100n, f100],
    [1000n, f1000],
    [10000n, f10000]])("factorialFor(%s)", (factorial, expected) => {
      expect(factorialFor(factorial)).toBe(expected);
    });
});

describe("testFactorialArr", () => {
  it.each([
    [0n, 1n], [1n, 1n], [2n, 2n],
    [3n, 6n], [4n, 24n], [5n, 120n],
    [6n, 720n], [7n, 5040n], [8n, 40320n],
    [9n, 362880n], [10n, 3628800n],
    [100n, f100],
    [1000n, f1000],
    [10000n, f10000]])("factorialArr(%s)", (factorial, expected) => {
      expect(factorialArr(factorial)).toBe(expected);
    });
});


describe("testFactorialRec", () => {
  it.each([
    [0n, 1n], [1n, 1n], [2n, 2n],
    [3n, 6n], [4n, 24n], [5n, 120n],
    [6n, 720n], [7n, 5040n], [8n, 40320n],
    [9n, 362880n], [10n, 3628800n],
    [100n, f100],
    [1000n, f1000],
    [10000n, f10000]])("factorialRec(%s)", (factorial, expected) => {
      expect(factorialRec(factorial)).toBe(expected);
    });
});
