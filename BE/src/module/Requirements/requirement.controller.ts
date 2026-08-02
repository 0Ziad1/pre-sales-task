import { Router } from "express";
import { validate } from "../../utils/middleware/validation.js";

import { upsertRequirementSchema } from "./requirement.validation.js";
import requirementService from "./requirement.service.js";
import { objectIdvalidateSchema } from "../common/validation.js";

const router =Router();

router.put("/:id",validate(objectIdvalidateSchema),validate(upsertRequirementSchema),requirementService.upsertRequirements)
router.delete("/:id",validate(objectIdvalidateSchema),requirementService.deleteRequirement);
router.get("/:id",validate(objectIdvalidateSchema),requirementService.getRequirement);

export default router;