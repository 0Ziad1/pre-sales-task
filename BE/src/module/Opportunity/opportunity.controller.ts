import { Router } from "express";
import { validate } from "../../utils/middleware/validation.js";

import opportunityService from "./opportunity.service.js";
import { createOpportunitySchema, getOpportunitiesSchema, updateOpportunitySchema } from "./opportunity.validation.js";
import { objectIdvalidateSchema } from "../common/validation.js";

const router = Router();
router.post("/create", validate(createOpportunitySchema), opportunityService.createOpportunity);
router.get("/getAll", validate(getOpportunitiesSchema), opportunityService.getAllOpportunities);
router.get("/:id", validate(objectIdvalidateSchema), opportunityService.getOpportunityById);
router.put("/:id", validate(objectIdvalidateSchema), validate(updateOpportunitySchema)
, opportunityService.updateOpportunity);
router.delete("/:id",validate(objectIdvalidateSchema),opportunityService.deleteOpportunity);
export default router;