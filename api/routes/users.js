import express from 'express';
import { getUsers, addUser, updateUser, deleteUser, verificaUser, fetchSession } from "../controllers/user.js";



const router = express.Router();

// +++++ ROTAS ++++

router.get("/", getUsers);

router.post("/cadastro", addUser); // método post, função addUser

router.put("/:id", updateUser); // método put, função updateUser

router.delete("/:id", deleteUser); // método delete, função deleteUser

router.post("/login", verificaUser); // método post, função verificar

router.get("/check-session", fetchSession); // método get para checar session




export default router;
