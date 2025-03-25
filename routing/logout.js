// 🏗 Stwórz funkcję 'logoutRouting', która obsłuży stronę wylogowania.
// 🏗 Ustaw odpowiedni nagłówek 'Content-Type'.
// Podpowiedź: response.setHeader("Content-Type", "text/html");
// 🏗 Zakończ odpowiedź HTTP po wyrenderowaniu strony.
// Podpowiedź: return response.end();

// 🔧 Wyeksportuj funkcję 'logoutRouting', aby inne moduł mogły jej używać.

const fs = require('fs');
const path = require('path');
const STATUS_CODE = require("../constants/statusCode");

function logoutRouting(req, res) {
    res.setHeader("Content-Type", "text/html");
  
    const filePath = path.join(__dirname, '../template/logout.html');

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            res.writeHead(STATUS_CODE.NOT_FOUND, { 'Content-Type': 'text/plain' });
            res.end('Nie znaleziono strony dodawania produktu.');
        } else {
            res.writeHead(STATUS_CODE.FOUND, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
  }
  
  module.exports = logoutRouting;