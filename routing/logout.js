// 🏗 Stwórz funkcję 'logoutRouting', która obsłuży stronę wylogowania.
function logoutRouting(request, response) {
    // 🏗 Ustaw odpowiedni nagłówek 'Content-Type'.
    // Podpowiedź: response.setHeader("Content-Type", "text/html");
    response.setHeader("Content-Type", "text/html");

    // 🏗 Wyświetl stronę wylogowania.
    response.end(`
        <html>
        <head><title>Logout</title></head>
        <body>
            <h1>You have been logged out</h1>
            <nav>
                <a href="/">Home</a>
                <a href="/product/new">Newest product</a>
            </nav>
        </body>
        </html>
    `);

    // 🏗 Zakończ odpowiedź HTTP po wyrenderowaniu strony.
    // Podpowiedź: return response.end();
    return response.end();
}

// 🔧 Wyeksportuj funkcję 'logoutRouting', aby inne moduł mogły jej używać.
module.exports = { logoutRouting };
