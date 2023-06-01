// Declaration Merging
// (https://www.typescriptlang.org/docs/handbook/declaration-merging.html)

// Definition: Der Compiler kann zwei (& mehr) seperate Deklarationen mit dem gleichen Namen in eine einzelne Definition mergen.
//             Die gemergte Definition hat alle Features beider original Deklarationen.

// Interface + Interface: Gemergte Interfaces besitzen alle members beider Deklarationen.
    interface Box1 {
      height: number;
      width: number;
    }
    interface Box1 {
      scale: number;
    }
    // Merged zu
    // interface Box1 {
    //   scale: number;
    //   height: number;
    //   width: number;
    // }
    const myBox1: Box1 = { height: 1, scale: 1, width: 1}
    console.log({ myBox1 })
    
    // Regel 1: Non-Function members müssen entweder unique (unterschiedlicher Name) oder vom gleichen Typ (falls gleicher Name) sein.
    interface Box2 {
      x: number;
    }
    interface Box2 {
      x: number; // ok
      y: number;
    }
    interface Box2 {
      // x: string; // Fehler: Subsequent property declarations must have the same type.  Property 'x' must be of type 'number', but here has type 'string'.
    } 
    const myBox2: Box2 = { x: 1, y: 1 }
    console.log({ myBox2 })
    // Regel 2: Function members müssen nicht unique sein => die Funktionen werden überladen.
    //          Beim Überladen gibt es 2 Regeln:
    //            Regel 1: Später deklarierte Interfaces haben eine höhere Präzedenz / haben Vorrang.
    //            Regel 2: Funktionen mit String literals (z.B. (type: "cat") => void und nicht (type: string) => void) als Parameter haben eine höhere Präzedenz

// Namespace + Namespace: Gemergte Namespaces besitzen alle members beider Deklarationen.
    namespace Animals {
      export class Zebra {}
    }
    namespace Animals {
      export interface Legged {
        numberOfLegs: number;
      }
      export class Dog {}
    }
    // Merged zu
    // namespace Animals {
    //   export interface Legged {
    //     numberOfLegs: number;
    //   }
    //   export class Zebra {}
    //   export class Dog {}
    // }
    const myLeggedAnimal: Animals.Legged = { numberOfLegs: 4 }
    console.log({ myLeggedAnimal });

    // Achtung: Nur exportete Member werden gemerged! Nicht exportete Members sind nur im originalen nicht-merged namespace ersichtlich.
    namespace Animal {
      let haveMuscles = true;
      export function animalsHaveMuscles() {
        return haveMuscles;
      }
    }
    namespace Animal {
      export function doAnimalsHaveMuscles() {
        // return haveMuscles; // nicht ok: haveMuscles nicht sichtbar
      }
    }

// Klassen + Namespace: Namespaces können mit Klassen gemerged werden
    // z.B. um innere Klassen zu beschreiben
    class Album {
      label: Album.AlbumLabel;
    }
    namespace Album {
      export class AlbumLabel {
        tracks: number;
      }
    }
    const label: Album.AlbumLabel = { tracks: 2 };
    const album: Album = { label: label };
    console.log({ album })

// Funktion + Namespace: Funktionen können extended werden indem properties zur Funktion hinzugefügt werden

    // @ts-ignore Beispiel mit JS
    const myFun = () => console.log(myFun.a + myFun.b);
    myFun.a = 4;
    myFun.b = 5;

    // TS macht das mit namespace type-safe
    function buildLabel(name: string): string {
      return buildLabel.prefix + name + buildLabel.suffix;
    }
    namespace buildLabel {
      export let suffix = "!";
      export let prefix = "Hello, ";
    }
    console.log({ 'buildLabel("John Doe")': buildLabel("John Doe") })

// Enum + Namespace: Enums können mit statischen members erweitert werden
    enum Color {
      red = 1,
      green = 2,
      blue = 4,
    }
    namespace Color {
      export function mixColor(colorName: string) {
        if (colorName == "yellow") {
          return Color.red + Color.green;
        } else if (colorName == "white") {
          return Color.red + Color.green + Color.blue;
        } else if (colorName == "magenta") {
          return Color.red + Color.blue;
        } else if (colorName == "cyan") {
          return Color.green + Color.blue;
        }
      }
    }
    console.log({ 'Color.mixColor("cyan")': Color.mixColor("cyan") });

// Global augmentation: Man kann den globalen scope augmentieren / patchen.
    declare global {
      interface Array<T> {
        returnTrue(): boolean;
      }
    }
    Array.prototype.returnTrue = function () {
      return true;
    };
    console.log({ "[]].returnTrue()": [].returnTrue() });
    export {};

// Module Augmentation: Javascript Module können nicht gemerged werden, aber man kann existierende Objekte "patchen":
    // observable.ts
        // export class Observable<T> {}
    // map.ts
        // import { Observable } from "./observable";
        // declare module "./observable" {
        //   interface Observable<T> {
        //     map<U>(f: (x: T) => U): Observable<U>;
        //   }
        // }
        // Observable.prototype.map = function (f) {}
    // consumer.ts
        // import { Observable } from "./observable";
        // import "./map";
        // let o: Observable<number>;
        // o.map((x) => x.toFixed());

// Limit: Klassen können nicht mit Klassen (oder Variablen) gemerged werden. (=> Mixins mimicked class merging.)
