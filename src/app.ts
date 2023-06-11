import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { User } from "./models/User.model";

const users = [
  {
    name: "Oleh",
    age: 20,
    gender: "male",
  },
  {
    name: "Anton",
    age: 10,
    gender: "male",
  },
  {
    name: "Inok",
    age: 25,
    gender: "female",
  },
  {
    name: "Anastasiya",
    age: 15,
    gender: "female",
  },
  {
    name: "Cocos",
    age: 25,
    gender: "other",
  },
];

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CRUD - create, read, update, delete

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User;

    return res.json(users);
  } catch (e) {
    console.log(e);
  }
});

app.get("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  res.status(200).json(users[+id]);
});

app.post("/users", (req: Request, res: Response) => {
  users.push(req.body);

  res.status(201).json({
    message: "User created.",
  });
});

app.put("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  users[+id] = req.body;

  res.status(200).json({
    message: "User updated",
    data: users[+id],
  });
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  users.splice(+id, 1);

  res.status(200).json({
    message: "User deleted",
  });
});

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log(`Server has started on PORT ${configs.PORT}`);
});
