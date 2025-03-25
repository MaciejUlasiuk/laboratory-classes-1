// 📦 Zaimportuj moduły 'fs' oraz 'STATUS_CODE' do obsługi produktów.
const fs = require('fs');

// 🏗 Stwórz funkcję 'productRouting', która obsłuży żądania dotyczące produktów.
function productRouting(url, method, request, response) {
    response.setHeader("Content-Type", "text/html");
    
    // 🏗 Stwórz funkcję 'renderAddProductPage', która wyrenderuje stronę dodawania produktu.
    if (url.includes("/product/add")) {
        if (method === "GET") {
            response.end(`
                <html>
                <head><title>Shop - Add product</title></head>
                <body>
                    <h1>Add product</h1>
                    <form action="/product/add" method="POST">
                        <input type="text" name="name" placeholder="Product Name" required>
                        <input type="text" name="description" placeholder="Description" required>
                        <button type="submit">Add Product</button>
                    </form>
                    <nav>
                        <a href="/">Home</a>
                        <a href="/product/new">Newest product</a>
                        <a href="/logout">Logout</a>
                    </nav>
                </body>
                </html>
            `);
        } else if (method === "POST") {
            
            // 🏗 Stwóz funkcję 'addNewProduct', która obsłuży dodawanie nowego produktu, zapisywanie go do pliku 'product.txt' oraz przeniesie użytkownika na stronę '/product/new'.
            // Podpowiedź: fileSystem.writeFile(...);
            // Podpowiedź: response.setHeader("Location", "/product/new");
            let body = "";
            request.on("data", chunk => body += chunk.toString()); // Używamy 'request', bo to jest argument funkcji
            request.on("end", () => {
                fs.writeFileSync("product.txt", body); // Zapisujemy dane do pliku
                response.writeHead(302, { Location: "/product/new" }); // Przekierowanie
                response.end();
            });
        }
    } else if (url.includes("/product/new")) {
        
        // 🏗 Stwórz funkcję 'renderNewProductPage', która wyświetli najnowszy produkt z pliku 'product.txt'.
        // Podpowiedź: fileSystem.readFile(...);
        let product = "No new products available";
        if (fs.existsSync("product.txt")) {
            product = fs.readFileSync("product.txt", "utf-8");
        }
        response.end(`
            <html>
            <head><title>Shop - Newest product</title></head>
            <body>
                <h1>Newest product</h1>
                <p>${product}</p>
                <nav>
                    <a href="/">Home</a>
                    <a href="/product/add">Add product</a>
                    <a href="/logout">Logout</a>
                </nav>
            </body>
            </html>
        `);
    } else {
        console.error(`ERROR: requested url ${url} doesn’t exist.`);
        response.writeHead(404);
        response.end("Not Found");
    }
}

// 🔧 Wyeksportuj funkcję 'productRouting', aby inne moduł mogły jej używać.
module.exports = { productRouting };
