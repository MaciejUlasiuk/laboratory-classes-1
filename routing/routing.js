// 📦 Zaimportuj moduł odpowiedzialne za routing poszczególnych części aplikacji.
// 📦 Zaimportuj obiekt STATUS_CODE.
const { STATUS_CODE } = require('../constants/statusCode');
const { productRouting } = require('./product');
const { logoutRouting } = require('./logout');
const { homeRouting } = require('./home');

// 🏗 Stwórz tutaj funkcję 'requestRouting', która będzie obsługiwać zapytania HTTP.
const requestRouting = (request, response) => {
    const { method, url } = request;

    // 🏗 Tutaj stwórz logowanie do konsoli informacji, mówiące o typie logowania (INFO), dacie, metodzie oraz url żądania.
    console.log(`[INFO] ${new Date().toISOString()} - ${method} request to ${url}`);

    // 🏗 Tutaj stwórz podstawowy 'request routing' dla ścieżek '/', zawierającej /product' oraz '/logout'. Przekaż `request` i `routing` do odpowiednio routingu.
    if (url === '/') {
        homeRouting(method, response);  
    } else if (url.includes("/product")) {
        productRouting(url, method, request, response);
    } else if (url === "/logout") {
        logoutRouting(request, response); 
    } else if (url === "/kill") {
        // 🏗 Obsłuż specjalny przypadek, jeśli użytkownik zostanie przekierowany na ścieżkę /kill
        // 🏗 Stwórz również logowanie do konsoli informacji, mówiące o typie logowania (PROCESS), dacie oraz informację, że wylogowowyanie zostało wywołane a aplikacja zamknie się.
        console.log(`[PROCESS] ${new Date().toISOString()} - Logging out, server shutting down.`);
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("<h1>Logging out...</h1>");
        process.exit(); 
    } else {
        // 🏗 Tutaj stwórz obsługę przypadku, jeśli żądany URL nie istnieje. Zwróć wtedy błąd 404.
        // 🏗 Stwórz również logowanie do konsoli informacji, mówiące o typie logowania (ERROR), dacie oraz informację, że żądany url nie istnieje.
        console.error(`[ERROR] ${new Date().toISOString()} - Requested URL ${url} not found`);
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end("<h1>404 Not Found</h1>");
    }
};

// 🔧 Wyeksportuj funkcję 'requestRouting', aby inne moduł mogły jej używać.
module.exports = { requestRouting };
