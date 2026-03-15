import express from "express";
import {
  createEntry,
  updateEntry,
  deleteEntry,
  getEntries,
  getEntry,
} from "../controllers/entry.controller.js";

const router = express.Router();

router.post("/", createEntry);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);
router.get("/author/:userId", getEntries);
router.get("/:id", getEntry);

export default router;