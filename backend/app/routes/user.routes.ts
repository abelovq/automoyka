import { Router } from "express";

import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user.controller";

const router = Router();

// get user by id
router.get("/users/:id", getUser);

// create user
router.post("/users", createUser);

// update user
router.put("/users/:id", updateUser);

// delete user
router.delete("/users/:id", deleteUser);

export default router;
