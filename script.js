// Beispielhafte Funktion für das Überprüfen, ob der Benutzer gewonnen hat
function checkWinner() {
    // Zufällige Entscheidung, ob der Benutzer gewonnen hat
    const winner = Math.random() < 0.5; // 50% Chance zu gewinnen

    // Ändere den Text je nach Ergebnis
    const resultDiv = document.getElementById('result');
    if (winner) {
        resultDiv.innerText = "Herzlichen Glückwunsch, du hast gewonnen!";
        resultDiv.style.color = "green";
    } else {
        resultDiv.innerText = "Leider kein Gewinn, versuche es noch einmal!";
        resultDiv.style.color = "red";
    }
}

