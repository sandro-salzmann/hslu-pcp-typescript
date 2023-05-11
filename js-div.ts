// TypeScript is not executable in browser and must be transpiled to JavaScript
// emit JS for just the js-div.ts with the compiler defaults
// tsc js-div.ts


// access modifiers
class Model {
    private a: string;
    constructor(a: string) {
        this.a = a;
    }
}
let model = new Model("a");
// Property 'a' is private and only accessible within class 'Model'.
console.log(model.a);


// statically typed
let b = 0;
// 0
console.log(b);
// Type 'string' is not assignable to type 'number'.
b = 'b';
console.log(b);
// Type '{ key: string; }' is not assignable to type 'number'.
b = { key: 'b' };
console.log(b);


// generics
function generic<T>(t: T): T {
    return t;
}
// string
let gen1 = generic<string>("string");
console.log(gen1);
// 2
let gen2 = generic<number>(2);
console.log(gen2);


// interfaces
interface InterfaceA {
    a: string;
}
let aObj: InterfaceA = {
    a: "string",
};
// "a": "string"
console.log(aObj);


// enums
enum Color { Red, Green, Blue }
let green: Color = Color.Green;
// 1
console.log(green);


