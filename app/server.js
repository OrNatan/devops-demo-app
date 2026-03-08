const http = require("http");

const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Home page\n");

  } else if (req.url === "/test") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Test page\n");

  } else if (req.url === "/health") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ status: "ok" }));

  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Page not found\n");
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});