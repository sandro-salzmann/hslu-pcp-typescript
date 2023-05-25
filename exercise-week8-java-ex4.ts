/*
Implementieren Sie eine Methode public String processNames(String[] names) , welche für
einen Array von Strings alle Strings mit einer Länge zwischen 3 und 4 (je inklusiv) in
Grossbuchstaben umwandelt und, mit einem Abstand dazwischen, zusammen hängt. Für den Array
{"Susanna", "Joe", "Lu", "Timmy", "Rafael", "Lisa"} soll die Rückgabe also wie folgt
aussehen: "JOE LISA" .
Hinweise: Verwenden Sie dazu einen String-Stream sowie passende Aggregate-Operationen.
Verwenden Sie an passender Stelle eine Methoden-Referenz auf eine String-Methode.
*/

const names: string[] = ["Susanna", "Joe", "Lu", "Timmy", "Rafael", "Lisa"];

function processNames(names: string[]): string {
    return names
        .filter((name) => { return ((name.length >= 3) && (name.length <= 4)); })
        .map((name) => { return name.toUpperCase(); })
        .join(" ");
}

console.log(processNames(names));
