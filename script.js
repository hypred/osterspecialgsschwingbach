// Array mit den gültigen QR-Code-IDs
let validCodes = [
    "gewinner1", // Beispiel für einen gültigen QR-Code
    "gewinner2",
    "gewinner3",
    "gewinner4",
    "gewinner5"
];

let scanning = false; // Flag, das anzeigt, ob wir gerade scannen

// Funktion, die das Scannen mit der Kamera startet
function startScanning() {
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const resultDiv = document.getElementById('result');

    // Kamera zugänglich machen (getUserMedia benötigt https://)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Versuchen, die Rückkamera zu verwenden
        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment"  // Hier wird die Rückkamera (environment) verwendet
            }
        })
        .then((stream) => {
            // Den Video-Tag auf den Kamera-Stream setzen
            video.srcObject = stream;
            video.setAttribute("playsinline", true); // Für iOS erforderlich
            video.play();
            document.getElementById('scanTrigger').style.display = 'inline'; // Zeige den Scan-Button an
        })
        .catch((err) => {
            resultDiv.innerText = "Kamera konnte nicht gestartet werden.";
            resultDiv.style.color = "red";
        });
    } else {
        resultDiv.innerText = "Kamera wird nicht unterstützt.";
        resultDiv.style.color = "red";
    }
}

// Funktion, die das Scannen manuell auslöst
function triggerScan() {
    if (!scanning) {
        scanning = true;  // Setze das Flag, dass wir gerade scannen
        scanQRCode();  // Starte das Scannen
    }
}

// Funktion zum Scannen des QR-Codes
function scanQRCode() {
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const resultDiv = document.getElementById('result');

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
            scanning = false; // Setze das Flag zurück
        } else {
            resultDiv.innerText = "Leider kein Gewinn, versuche es noch einmal!";
            resultDiv.style.color = "red";
            scanning = false; // Setze das Flag zurück
        }
    } else {
        // Wenn kein QR-Code erkannt wurde, weiter scannen
        if (scanning) {
            requestAnimationFrame(scanQRCode);
        }
    }
}
