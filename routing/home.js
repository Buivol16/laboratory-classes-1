// 🏗 Stwórz funkcję 'homeRouting', która obsłuży stronę główną.
// 🏗 Ustaw odpowiedni nagłówek 'Content-Type'.
// Podpowiedź: response.setHeader("Content-Type", "text/html");
// 🏗 Zakończ odpowiedź HTTP po wyrenderowaniu strony.
// Podpowiedź: return response.end();

// 🔧 Wyeksportuj funkcję 'homeRouting', aby inne moduł mogły jej używać.

const fs = require('fs');
const path = require('path');
const STATUS_CODE = require("../constants/statusCode");

const homeRouting = (request, response) => {
    const { url, method } = request;

    if (method === "GET" && url === "/") {
        const filePath = path.join(__dirname, '../template/home.html');

        fs.readFile(filePath, 'utf-8', (err, data) => {
            response.writeHead(STATUS_CODE.FOUND, { 'Content-Type': 'text/html' });
            response.end(data);
        });
    }

}

module.exports = homeRouting;