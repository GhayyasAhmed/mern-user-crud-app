import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController";
import { validateRequest } from "../middlewares/validateRequest";
import { validateCreateUser, validateUpdateUser } from "../validators/userValidators";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", validateRequest(validateCreateUser), createUser);
router.patch("/:id", validateRequest(validateUpdateUser), updateUser);
router.delete("/:id", deleteUser);

export default router;
