/*
Implementieren Sie die Factorial function in Java
1. Die erste Implementierung benutzt eine for loop
2. Die zweite Implementierung benutzt einen Stream
3. Die dritte Implementierung benutzt Rekursion
4. Schreiben Sie einen Unit Test die alle drei Funktionen gegeneinander überprüft mit den
Werte 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100, 1_000, 10_000.
Es ist einfacher für Sie wenn Ihren Unit Test ein parameterized Test ist.
*/

export function factorialFor(n: bigint): bigint {
    let factorial: bigint = 1n;
    for (let i = 1n; i <= n; i++) {
        factorial = factorial * i;
    }
    return factorial;
}

export function factorialArr(n: bigint): bigint {
    let numbers: bigint[] = [];
    for (let i = 1n; i <= n; i++) {
        numbers.push(i);
    }
    return numbers.reduce((n1: bigint, n2: bigint) => { return (n1 * n2); }, 1n);
}

export function factorialRec(n: bigint): bigint {
    if (n == 0n) {
        return 1n;
    }
    else {
        return n * factorialRec(n - 1n);
    }
}

/*
RangeError: Maximum call stack size exceeded

export function factorialRec(n: bigint, acc: bigint): bigint {
    if (n == 0n) {
        return acc;
    }
    else {
        return factorialRec(n - 1n, n * acc);
    }
}
*/
