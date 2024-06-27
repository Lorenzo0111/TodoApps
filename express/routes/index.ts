import { Router } from "express";
import { Database } from "bun:sqlite";

const router = Router();

const db = new Database("database.db");
db.exec(
  "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, title TEXT, completed BOOLEAN)"
);

router.get("/", (req, res) => {
  const query = db.prepare("SELECT * FROM todos");
  const todos = query.all();

  res.render("index", {
    todos: todos.map((todo: any) => ({
      ...todo,
      completed: todo.completed === 1,
    })),
  });
});

router.post("/add", (req, res) => {
  if (!req.body.title) {
    res.redirect("/");
    return;
  }

  const query = db.prepare(
    "INSERT INTO todos (title, completed) VALUES (?, ?)"
  );
  query.run(req.body.title, false);

  res.redirect("/");
});

router.post("/complete/:id", (req, res) => {
  const query = db.prepare("UPDATE todos SET completed = ? WHERE id = ?");
  query.run(req.body.completed === "on", req.params.id);

  res.redirect("/");
});

export default router;
