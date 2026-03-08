const http = require("http");

const port = 3000;

const server = http.createServer((req, res) => {
  console.log(req.url);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Esti Ella Natan I love You\n");
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});