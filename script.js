// Array mit den gültigen QR-Code-IDs
const validCodes = [
    "gewinner1", // Beispiel für einen gültigen QR-Code
    "gewinner2",
    "gewinner3",
    "gewinner4",
    "gewinner5"
];

// Funktion, die überprüft, ob der gescannte Code gültig ist
function checkWinner() {
    const qrInput = document.getElementById('qrInput').value; // Wert aus dem Eingabefeld lesen

    // Überprüfen, ob der QR-Code in den gültigen Codes enthalten ist
    if (validCodes.includes(qrInput)) {
        // Wenn der Code gültig ist
        const resultDiv = document.getElementById('result');
        resultDiv.innerText = "Herzlichen Glückwunsch, du hast gewonnen!";
        resultDiv.style.color = "green";
    } else {
        // Wenn der Code ungültig ist
        const resultDiv = document.getElementById('result');
        resultDiv.innerText = "Leider kein Gewinn, versuche es noch einmal!";
        resultDiv.style.color = "red";
    }
}
