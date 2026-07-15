import type { Express, NextFunction, Request, Response } from "express";
import cors from "cors"
import opportunityController from "./module/Opportunity/opportunity.controller.js"
import requirementController from "./module/Requirements/requirement.controller.js"
import requirementFileController from "./module/RequirementFile/requirementFile.controller.js"
import opportunityAnalysisController from "./module/opportunity-analysis/opportunityAnalysis.controller.js"
import { ZodError } from "zod";
import multer from "multer";
export async function bootStrap(app: Express, express: any) {
    app.use(express.json());
    app.use(cors({ origin: "*" }));
    app.use("/opportunity", opportunityController);
    app.use("/opportunities",opportunityAnalysisController)
    app.use("/requirement", requirementController);
    app.use("/requirement-file", requirementFileController);
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (
            err instanceof multer.MulterError
        ) {
            switch (err.code) {
                case "LIMIT_FILE_SIZE":
                    return res.status(400).json({
                        message:
                            "File size must not exceed 5 MB",
                    });
            }}
            if (err instanceof ZodError) {
                return res.status(400).json({
                    message: "Validation failed",
                    errors: err.issues.map(issue => ({
                        field: issue.path.join("."),
                        message: issue.message,
                    })),
                });
            }
            res.status(500).json({
                message: err.message || "Something went wrong",
            });
        }
    );
    app.use("/:dummy", (req: Request, res: Response, next: NextFunction) => {
        res.status(404).json({ message: "invalid url" })
    })
}