// Liste der gültigen Codes
const validCodes = ["abc123", "xyz456", "win789", "osterei01", "osterei02"];

// Funktion, um die URL-Parameter zu lesen
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Hauptlogik
window.onload = function () {
    const code = getQueryParam("code");
    const resultDiv = document.getElementById("result");

    if (!code) {
        resultDiv.innerHTML = "Bitte scanne einen gültigen QR-Code.";
        return;
    }

    if (!validCodes.includes(code)) {
        resultDiv.innerHTML = `<span class="used">Dieser Code ist ungültig!</span>`;
        return;
    }

    const usedCodes = JSON.parse(localStorage.getItem("usedCodes")) || [];

    if (usedCodes.includes(code)) {
        resultDiv.innerHTML = `<span class="used">Dieser Code wurde bereits eingelöst!</span>`;
    } else {
        resultDiv.innerHTML = `<span class="win">🎉 Glückwunsch! Du hast gewonnen! 🎉</span>`;
        usedCodes.push(code);
        localStorage.setItem("usedCodes", JSON.stringify(usedCodes));
    }
};
