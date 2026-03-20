import express from "express";
import {
  createItem,
  getItems,
  getItemById,
  deleteItem,
} from "../controllers/itemController.js";

const router = express.Router();

router.post("/", createItem);
router.get("/", getItems);
router.get("/:id", getItemById);
router.delete("/:id", deleteItem);

export default router;
