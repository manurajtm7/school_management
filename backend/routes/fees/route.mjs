import { Router } from "express";
const router = Router();
import {
  createFees,
  getAllFees,
  getFeesById,
  updateFees,
  deleteFees,
} from "../../controllers/fees_crud/FeesCrud.mjs";

// Route to create a new fee entry
router.post("/fees/create", createFees);

// Route to get all fee records
router.get("/fees/view", getAllFees);

// Route to get a specific fee by ID
router.get("/fees/view/:id", getFeesById);

// Route to update a specific fee by ID
router.put("/fees/update/:id", updateFees);

// Route to delete a specific fee by ID
router.delete("/fees/delete/:id", deleteFees);

export default router;
