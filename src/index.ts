// Simple joke API
// This API provides a random joke and allows fetching a specific joke by ID.
// The jokes are stored in a local array and can be easily modified.
// The API is built using the Hono framework, which is lightweight and fast.
// The API has two endpoints:
// 1. GET /joke - Returns a random joke from the list.
// 2. GET /joke/:id - Returns a specific joke by its ID.
// The API is designed to be simple and easy to use, making it a great choice for developers looking to add a joke feature to their applications.
// The jokes are stored in a local array and can be easily modified.

import { Hono } from "hono";
import JOKES from "./jokes";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Joke API");
});

app.get("/joke", (c) => {
  const randomIndex = Math.floor(Math.random() * JOKES.length);
  const joke = JOKES[randomIndex];
  return c.json({ joke });
});

app.get("/joke/:id", (c) => {
  const id = parseInt(c.req.param("id"), 10);
  const joke = JOKES.find((j) => j.id === id);
  if (!joke) {
    return c.text("Joke not found", 404);
  }
  return c.json({ joke });
});

export default app;
