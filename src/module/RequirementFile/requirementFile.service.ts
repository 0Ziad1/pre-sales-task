import type { NextFunction, Request, Response } from "express";
import Opportunity from "../../model/opportunity/opportunity.model.js";
import RequirementFile from "../../model/requirementFile/requirementFile.model.js";
import { ALLOWED_FILES } from "../../utils/enum/index.js";
import fs from "fs/promises";
class RequirementFileService {
    constructor() { };
    public uploadFile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params as { id: string };

            const opportunity =
                await Opportunity.findById(
                    id
                );

            if (!opportunity) {
                if (req.file) {
                    await fs.unlink(req.file.path)
                        .catch(() => { });
                }
                return res.status(404).json({
                    message:
                        "Opportunity not found",
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    message:
                        "File is required",
                });
            }
            let fileType: ALLOWED_FILES;

            switch (req.file.mimetype) {
                case "application/pdf":
                    fileType = ALLOWED_FILES.pdf;
                    break;

                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    fileType = ALLOWED_FILES.docx;
                    break;

                case "text/plain":
                    fileType = ALLOWED_FILES.txt;
                    break;

                default:
                    throw new Error("Unsupported file type");
            }
            const file =
                await RequirementFile.create(
                    {
                        opportunityId:
                            id,

                        originalName:
                            req.file
                                .originalname,

                        fileName:
                            req.file
                                .filename,

                        filePath:
                            req.file.path,

                        fileType,

                        fileSize:
                            req.file.size,
                    }
                );

            return res.status(201).json({
                message:
                    "File uploaded successfully",

                data: file,
            });
        } catch (error) {
            next(error);
        }
    };
    public getFilesByOpportunity =
        async (
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            try {
                const { id } = req.params as { id: string; };

                const opportunity =
                    await Opportunity.findById(id);

                if (!opportunity) {
                    return res
                        .status(404)
                        .json({
                            message:
                                "Opportunity not found",
                        });
                }
                const files =
                    await RequirementFile.find({
                        opportunityId:
                            id,
                    });
                return res
                    .status(200)
                    .json({
                        message:
                            "Files fetched successfully",

                        data: files,
                    });
            } catch (
            error
            ) {
                next(error);
            }
        };
    public deleteFile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params as { id: string; };

            const file = await RequirementFile.findById(id);

            if (!file) {
                return res
                    .status(404)
                    .json({
                        message:
                            "File not found",
                    });
            }

            try {
                await fs.
                    unlink(file.filePath);
            } catch { };

            await file.deleteOne();

            return res
                .status(200)
                .json({
                    message:
                        "File deleted successfully",
                });
        } catch (
        error
        ) {
            next(error);
        }
    };
}
export default new RequirementFileService;