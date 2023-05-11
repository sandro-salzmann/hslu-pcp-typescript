// Optional 
// (https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-parameters)

// Funktionen können eine variable Anzahl an Argumente entgegennehmen.
function f(x?: number) {
  // x hat den Typ "number | undefined". Undefined dabei, weil unspezifizierte Parameter den Wert "undefined" bekommen
}
f(); // OK
f(10); // OK
// Optionale parameter müssen immer vor required parameter stehen.
function f2(y: number, x?: number){}; // compiled
// function f3(x?: number, y: number) {}; // compiled nicht
// Aufrufe wie f3(,10) werden nicht unterstützt


// Default
// (https://www.typescriptlang.org/docs/handbook/2/functions.html#rest-parameters-and-arguments)

// Optionalen Parameter können default Werte zugewiesen werden.
function f4(x = 10) {
  // x hat den Typ "number", weil falls x undefined ist wird es durch 10 ersetzt
}
f4(); // OK
f4(10); // OK


// Rest Parameter
// (https://www.typescriptlang.org/docs/handbook/2/functions.html#rest-parameters-and-arguments)

// Funktionen können eine unbounded Anzahl Argumente entgegennehmen mit rest Parametern.
// Ein rest Parameter muss nach allen anderen Parametern stehen.
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);

// Das Gegenstück sind Rest Argumente: Man kann eine variable Anzahl Argumente liefern mit der spread-Syntax.
const arr = [4, 5, 6];
// push hat Signatur Array<number>.push(...items: number[]): number
[].push(...arr);

// Vorsicht bei Nutzung von Rest Argumenten einem nicht Rest Parameter: Typescript nimmt nicht an, dass Arrays immutable sind!
const args = [8, 5];
// atan2 hat Signatur Math.atan2(y: number, x: number): number
// Math.atan2(...args); // compiled nicht
const args2 = [8, 5] as const; // Inferred as 2-length tuple
Math.atan2(...args2); // OK

