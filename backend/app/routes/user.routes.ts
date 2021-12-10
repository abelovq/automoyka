import { Router } from "express";

import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.controller";

const router = Router();

// get all users
router.get("/users", getAllUsers);

// get user by id
router.get("/users/:id", getUser);

// create user
router.post("/users", createUser);

// update user
router.put("/users/:id", updateUser);

// delete user
router.delete("/users/:id", deleteUser);

export default router;
