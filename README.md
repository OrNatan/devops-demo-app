# DevOps Demo App

A small learning project for practicing DevOps concepts with a simple Node.js HTTP server, Redis, Docker Compose, and Nginx.

## Current Architecture

Browser → Nginx → Node.js App → Redis

## Services

- **app** - Node.js HTTP server
- **redis** - in-memory key-value store
- **nginx** - reverse proxy

## Endpoints

- `/` - home page
- `/test` - test page
- `/health` - health check endpoint
- `/info` - app version, uptime, and container hostname
- `/redis-test` - test Redis write and read
- `/nginx` - response returned directly from Nginx

## Run the Project

```bash
docker compose up --buildgit status