// Mixins are a pattern that allows to mix behaviors and properties into a class.
// A mixin is just a function that takes a class constructor and returns a class constructor.

type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
    return class Timestamped extends Base {
        timestamp = Date.now();
    };
}

class Machine {
    name: string;
    isActive = false;

    constructor(name: string) {
        this.name = name;
    }

    activate() {
        this.isActive = true;
    }

    deactivate() {
        this.isActive = false;
    }
}

// create a new class by mixing `Timestamped` into `Machine`
const TimestampedMachine = Timestamped(Machine);

// instantiate the new `TimestampedMachine` class
const machine = new TimestampedMachine("MachineWithTimeStamp");

// access properties, methods from both
console.log(machine.name); // "MachineWithTimeStamp"

console.log(machine.timestamp); // 1683823494916

machine.activate();
console.log(machine.isActive); // true