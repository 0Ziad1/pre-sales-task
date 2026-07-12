import type { NextFunction, Request, Response } from "express";
import type { CreateOpportunityDTO, getOpportunityDTO } from "./opportunity.dto.js";
import Opportunity from "../../model/opportunity/opportunity.model.js";
import OpportunityRequirement from "../../model/opportunityRequirements/opportunityRequirements.model.js";
import RequirementFile from "../../model/requirementFile/requirementFile.model.js";
import { STATUS_VAL } from "../../utils/enum/index.js";

export class OpportunityService {
    constructor() { }


    public createOpportunity = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto: CreateOpportunityDTO = req.body as any;
            const opportunity = await Opportunity.create({
                title:dto.title,
                description:dto.description,
                clientName:dto.clientName,
                status:STATUS_VAL.new,
            });

            return res.status(201).json({
                message: "Opportunity created successfully.",
                data: opportunity,
            });
        } catch (error) {
            next(error);
        }
    };


    public getAllOpportunities = async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const { status, search } = req.query;

            const filter: any = {};

            if (status) {
                filter.status = status;
            }
            if (search) {
                filter.$or = [
                    { title: { $regex: search } },
                    { clientName: { $regex: search } },
                ];
            }
            const opportunities = await Opportunity.find(filter);
            return res.status(200).json({
                message: "Success",
                data: opportunities,
            });
        } catch (error) {
            next(error);
        }
    };


    public getOpportunityById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id }: getOpportunityDTO = req.params;

            const opportunity = await Opportunity.findById(id);

            if (!opportunity) {
                return res.status(404).json({
                    message: "Opportunity not found",
                });
            }
            return res.status(200).json({
                message: "Success",
                data: opportunity,
            });
        } catch (error) {
            next(error);
        }
    };


    public updateOpportunity = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params as { id: string };

            const updatedData = req.body;
            if (updatedData.status === STATUS_VAL.readyForAnalysis) {
                const hasRequirements = await OpportunityRequirement.exists({
                    opportunityId: id
                })
                const hasFiles = await RequirementFile.exists({
                    opportunityId: id
                })

                if (!hasRequirements &&
                    !hasFiles) {
                    return res.status(400).json({
                        message:
                            "Opportunity cannot be marked as ready for analysis before adding requirements text or uploading files",
                    });
                }
            }

            const opportunity =
                await Opportunity.findByIdAndUpdate(
                    id,
                    updatedData,
                    {
                        new: true,
                        runValidators:
                            true,
                    }
                );

            if (!opportunity) {
                return res.status(404).json({
                    message:
                        "Opportunity not found",
                });
            }

            return res.status(200).json({
                message:
                    "Opportunity updated successfully",

                data:
                    opportunity,
            });
        } catch (error) {
            next(error);
        }
    };

    public deleteOpportunity = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params as { id: string };;

            const opportunity = await Opportunity.findById(id);

            if (!opportunity) {
                return res.status(404).json({
                    message: "Opportunity not found",
                });
            }

            await OpportunityRequirement.deleteOne({
                opportunityId: id,
            });

            await RequirementFile.deleteMany({
                opportunityId: id,
            });

            await opportunity.deleteOne();

            return res.status(200).json({
                message: "Opportunity deleted successfully",
            });
        } catch (error) {
            next(error);
        }
    };
}
export default new OpportunityService;