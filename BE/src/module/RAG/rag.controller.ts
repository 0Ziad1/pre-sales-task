import { Router } from "express";
import ragService from "./rag.service.js";

const router = Router();
router.post("/ask", ragService.chatBot);
router.post(
    "/generate-embeddings",
    ragService.generateEmbeddings
);
export default router;