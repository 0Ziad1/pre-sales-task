import type { NextFunction, Request, Response } from "express";
import Opportunity from "../../model/opportunity/opportunity.model.js";
import RequirementFile from "../../model/requirementFile/requirementFile.model.js";
import { ALLOWED_FILES } from "../../utils/enum/index.js";
import fs from "fs/promises";
import { BadRequestError, NotFoundError } from "../../utils/error/index.js";
class RequirementFileService {
    constructor() { };
    public uploadFile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
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
            throw new BadRequestError("File is required")
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

    };
    public getFilesByOpportunity =
        async (
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            const { id } = req.params as { id: string; };

            const opportunity =
                await Opportunity.findById(id);

            if (!opportunity) {
                throw new NotFoundError("Opportunity not found")
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
        };
    public deleteFile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { id } = req.params as { id: string; };

        const file = await RequirementFile.findById(id);

        if (!file) {
            throw new NotFoundError("File not found")
        }


        await fs.
            unlink(file.filePath);

        await file.deleteOne();

        return res
            .status(200)
            .json({
                message:
                    "File deleted successfully",
            });
    }
};

export default new RequirementFileService;