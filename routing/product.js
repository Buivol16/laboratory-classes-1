// 📦 Zaimportuj moduły 'fs' oraz 'STATUS_CODE' do obsługi produktów.

// 🏗 Stwórz funkcję 'productRouting', która obsłuży żądania dotyczące produktów.

// 🏗 Stwórz funkcję 'renderAddProductPage', która wyrenderuje stronę dodawania produktu.

// 🏗 Stwórz funkcję 'renderNewProductPage', która wyświetli najnowszy produkt z pliku 'product.txt'.
// Podpowiedź: fileSystem.readFile(...);

// 🏗 Stwóz funkcję 'addNewProduct', która obsłuży dodawanie nowego produktu, zapisywanie go do pliku 'product.txt' oraz przeniesie użytkownika na stronę '/product/new'.
// Podpowiedź: fileSystem.writeFile(...);
// Podpowiedź: response.setHeader("Location", "/product/new");

// 🔧 Wyeksportuj funkcję 'productRouting', aby inne moduł mogły jej używać.

const fs = require('fs');
const path = require('path');
const STATUS_CODE = require("../constants/statusCode");
const JSDOM = require("jsdom").JSDOM;

function renderHtmlFile(response, fileName, replacements = {}) {
  const filePath = path.join(__dirname, fileName);
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      response.statusCode = 500;
      response.end('<h1>Internal Server Error</h1>');
    } else {
      let html = data;
      for (const key in replacements) {
        html = html.replace(`{{${key}}}`, replacements[key]);
      }
      response.end(html);
    }
  });
}

function renderAddProductPage(response) {
  renderHtmlFile(response, '../template/add-product.html');
}

function renderNewProductPage(response) {
  fs.readFile(path.join(__dirname, 'product.txt'), 'utf-8', (err, data) => {
    if (err || !data.trim()) {
      return renderHtmlFile(response, '../template/no-product.html');
    }
    renderHtmlFile(response, '../template/new-product.html', { product: data });
  });
}

function addNewProduct(request, response) {
  let body = '';
  request.on('data', chunk => {
    body += chunk.toString();
  });

  request.on('end', () => {
    const parsed = new URLSearchParams(body);
    const name = parsed.get('name');
    const description = parsed.get('description');
    const content = `Nazwa: ${name}, Opis: ${description}`;

    fs.writeFile(path.join(__dirname, 'product.txt'), content, err => {
      if (err) {
        response.statusCode = 500;
        return response.end('<h1>Error saving product.</h1>');
      }
      response.statusCode = 302;
      response.setHeader('Location', '/product/new');
      response.end();
    });
  });
}

function productRouting(request, response) {
  const { url, method } = request;

  response.setHeader('Content-Type', 'text/html');

  if (url === '/product/add' && method === 'GET') {
    return renderAddProductPage(response);
  }

  if (url === '/product/add' && method === 'POST') {
    return addNewProduct(request, response);
  }

  if (url === '/product/new' && method === 'GET') {
    return renderNewProductPage(response);
  }

  console.warn(`ERROR: requested url ${url} doesn’t exist.`);
  response.end('<h1>ERROR: requested url doesn’t exist.</h1>');
}

module.exports = productRouting;  