const http = require("http");
const os = require("os");
const packageJson = require("./package.json");
const { createClient } = require("redis");

const port = 3000;

const redisClient = createClient({
  url: "redis://redis:6379"
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

async function startServer() {
  await redisClient.connect();

  const server = http.createServer(async (req, res) => {
    const startTime = Date.now();

    res.on("finish", () => {
      const duration = Date.now() - startTime;
      console.log(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
    });

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

    } else if (req.url === "/info") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");

      const info = {
        version: packageJson.version,
        uptime: process.uptime(),
        hostname: os.hostname()
      };

      res.end(JSON.stringify(info));

    } else if (req.url === "/redis-test") {
      await redisClient.set("message", "Hello from Redis");
      const value = await redisClient.get("message");

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ redisValue: value }));

    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("Page not found\n");
    }
  });

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();