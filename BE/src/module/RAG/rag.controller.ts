import { Router } from "express";
import ragService from "./rag.service.js";

const router = Router();
router.post("/ask", ragService.chatBot);
export default router;