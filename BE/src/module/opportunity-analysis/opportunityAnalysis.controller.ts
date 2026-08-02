import { Router } from "express";
import opportunityAnalysisService from "./opportunityAnalysis.service.js";
import { validate } from "../../utils/middleware/validation.js";
import { objectIdvalidateSchema } from "../common/validation.js";

const router = Router();
router.put("/:id/analysis",validate(objectIdvalidateSchema),opportunityAnalysisService.analyzeOpportunity);
router.get("/:id/analysis",validate(objectIdvalidateSchema),opportunityAnalysisService.getOpportunityAnalysis);
export default router;