// Array mit den gültigen QR-Code-IDs
let validCodes = [
    "gewinner1", // Beispiel für einen gültigen QR-Code
    "gewinner2",
    "gewinner3",
    "gewinner4",
    "gewinner5"
];

// Funktion, die das Scannen mit der Kamera startet
function startScanning() {
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const resultDiv = document.getElementById('result');

    // Kamera zugänglich machen (getUserMedia benötigt https://)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                // Den Video-Tag auf den Kamera-Stream setzen
                video.srcObject = stream;
                video.setAttribute("playsinline", true); // Für iOS erforderlich
                video.play();
                scanQRCode(); // QR-Code scannen, sobald das Video läuft
            })
            .catch((err) => {
                resultDiv.innerText = "Kamera konnte nicht gestartet werden.";
                resultDiv.style.color = "red";
            });
    } else {
        resultDiv.innerText = "Kamera wird nicht unterstützt.";
        resultDiv.style.color = "red";
    }

    // Funktion zum Scannen des QR-Codes
    function scanQRCode() {
        // Canvas auf die gleiche Größe wie das Video setzen
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // QR-Code mit jsQR analysieren
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height, {
            inversionAttempts: "dontInvert",
        });

        if (code) {
            const scannedCode = code.data;
            // Überprüfen, ob der QR-Code gültig ist und nicht bereits verwendet wurde
            if (validCodes.includes(scannedCode)) {
                // Einmalige Gültigkeit: Entferne den Code aus der Liste, wenn er benutzt wurde
                validCodes = validCodes.filter(code => code !== scannedCode);

                resultDiv.innerText = "Herzlichen Glückwunsch, du hast gewonnen!";
                resultDiv.style.color = "green";
            } else {
                resultDiv.innerText = "Leider kein Gewinn, versuche es noch einmal!";
                resultDiv.style.color = "red";
            }
        }

        // Weiter scannen
        requestAnimationFrame(scanQRCode);
    }
}
