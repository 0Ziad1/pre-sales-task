import { Router } from "express";
import { validate } from "../../utils/middleware/validation.js";
import requirementFileService from "./requirementFile.service.js";
import { upload } from "./multer.js";
import { objectIdvalidateSchema } from "../common/validation.js";
import { uploadRequirementFileschema } from "./requirementFile.validation.js";
const router = Router();
router.post("/upload/:id", validate(objectIdvalidateSchema), upload.single("file"), validate(uploadRequirementFileschema)
    , requirementFileService.uploadFile);
router.get(
    "/files/:id",
    validate(objectIdvalidateSchema),
    requirementFileService.getFilesByOpportunity
);
router.delete(
    "/files/:id",
    validate(objectIdvalidateSchema),
    requirementFileService.deleteFile
);
export default router;