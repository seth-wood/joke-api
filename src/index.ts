import { Hono } from "hono";
import JOKES from "./jokes";
import { parse } from "hono/utils/cookie";

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
