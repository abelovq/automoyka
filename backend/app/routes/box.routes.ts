import { Router } from "express";

import { getBookedBoxes, deleteBookedBox } from "../controllers/box.controller";

const router = Router();

// get books by ?id=5&cur_num=A650BC
router.get("/books", getBookedBoxes);

// delete books
router.delete("/books/:id", deleteBookedBox);

export default router;
