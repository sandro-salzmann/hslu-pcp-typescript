// Declaration Merging
// (https://www.typescriptlang.org/docs/handbook/declaration-merging.html)

// Definition: Der Compiler kann zwei (& mehr) seperate Deklarationen mit dem gleichen Namen in eine einzelne Definition mergen.
//             Die gemergte Definition hat alle Features beider original Deklarationen.

// Interface + Interface: Gemergte Interfaces besitzen alle members beider Deklarationen.
    interface Box {
      height: number;
      width: number;
    }
    interface Box {
      scale: number;
    }
    // Merged zu
    // interface Box {
    //   scale: number;
    //   height: number;
    //   width: number;
    // }
    // Regel 1: Non-Function members müssen entweder unique (unterschiedlicher Name) oder vom gleichen Typ (falls gleicher Name) sein.
    interface Box {
      x: number;
    }
    interface Box {
      x: number; // ok
    }
    interface Box {
      // x: string; // nicht ok
    } 
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
      export let suffix = "";
      export let prefix = "Hello, ";
    }

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
    console.log(Color.mixColor("cyan"));

    // Limit: Klassen können nicht mit Klassen (oder Variablen) gemerged werden. (=> Mixins mimicked class merging.)

// Global augmentation: Man kann den globalen scope augmentieren / patchen.
    declare global {
      interface Array<T> {
        returnTrue(): boolean;
      }
    }
    Array.prototype.returnTrue = function () {
      return true;
    };
    const trueValue = [].returnTrue();
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
        // Observable.prototype.map = function (f) {
        // };
    // consumer.ts
        // import { Observable } from "./observable";
        // import "./map";
        // let o: Observable<number>;
        // o.map((x) => x.toFixed());
