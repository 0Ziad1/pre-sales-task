import { Router } from "express";
import opportunityAnalysisService from "./opportunityAnalysis.service.js";

const router = Router();
router.get("/:id/analysis",opportunityAnalysisService.analyzeOpportunity)
export default router;