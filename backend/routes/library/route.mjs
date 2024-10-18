import { Router } from "express";
const router = Router();

import {
  createLibraryEntry,
  getAllLibraryEntries,
  getLibraryEntryById,
  updateLibraryEntry,
  deleteLibraryEntry,
} from "../../controllers/library_crud/LibraryCrud.mjs";

// Route to create a new library entry
router.post("/library/create", createLibraryEntry);

// Route to get all library entries
router.get("/library/view", getAllLibraryEntries);

// Route to get a specific library entry by ID
router.get("/library/view/:id", getLibraryEntryById);

// Route to update a specific library entry by ID
router.put("/library/update/:id", updateLibraryEntry);

// Route to delete a specific library entry by ID
router.delete("/library/delete/:id", deleteLibraryEntry);

export default router;
