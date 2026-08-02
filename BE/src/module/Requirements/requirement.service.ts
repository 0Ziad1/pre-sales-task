import type { NextFunction, Request, Response } from "express";
import OpportunityRequirement from "../../model/opportunityRequirements/opportunityRequirements.model.js";
import Opportunity from "../../model/opportunity/opportunity.model.js";
import { NotFoundError } from "../../utils/error/index.js"

class RequirementService {
    constructor() { }
    public upsertRequirements = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        const { id } = req.params;
        const body = req.body;
        const opportunity = await Opportunity.findById(
            id
        );

        if (!opportunity) {
            throw new NotFoundError("Opportunity not found");
        }

        const requirement =
            await OpportunityRequirement.findOneAndUpdate(
                {
                    opportunityId: id as Object,
                },
                {
                    requirementsText: body.requirementsText,
                },
                {
                    upsert: true,
                    new: true,
                    runValidators: true,
                }
            );

        return res.status(200).json({
            message:
                "Requirements saved successfully",
            data: requirement,
        });
    };
    public deleteRequirement = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { id } = req.params as { id: string };

        const opportunity = await Opportunity.findById(id);

        if (!opportunity) {
            throw new NotFoundError("Opportunity not found");
        }

        const requirement =
            await OpportunityRequirement.findOneAndDelete({
                opportunityId: id,
            });

        if (!requirement) {
            return res.status(200).json({
                message:
                    "No requirements text found for this opportunity.",
            });
        }

        return res.status(200).json({
            message:
                "Requirements deleted successfully.",
        });
    };
    public getRequirement = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { id } = req.params as { id: string };

        const opportunity = await Opportunity.findById(id);

        if (!opportunity) {
            throw new NotFoundError("Opportunity not found")
        }

        const requirement =
            await OpportunityRequirement.findOne({
                opportunityId: id,
            });

        if (!requirement) {
            return res.status(200).json({
                message:
                    "No requirements text found for this opportunity.",
            });
        }
        return res.status(200).json({
            message: "Success",
            data: requirement,
        });
    }
}
export default new RequirementService;