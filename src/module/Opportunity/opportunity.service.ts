import type { NextFunction, Request, Response } from "express";
import type { CreateOpportunityDTO, getOpportunityDTO } from "./opportunity.dto.js";
import Opportunity from "../../model/opportunity/opportunity.model.js";
import OpportunityRequirement from "../../model/opportunityRequirements/opportunityRequirements.model.js";
import RequirementFile from "../../model/requirementFile/requirementFile.model.js";
import { STATUS_VAL } from "../../utils/enum/index.js";
import { BadRequestError, NotFoundError } from "../../utils/error/index.js";

export class OpportunityService {
    constructor() { }


    public createOpportunity = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto: CreateOpportunityDTO = req.body as any;
            const opportunity = await Opportunity.create({
                title: dto.title,
                description: dto.description,
                clientName: dto.clientName,
                status: STATUS_VAL.new,
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
        const { status, search } = req.body;

        const filter: any = {};

        if (status) {
            filter.status = status;
        }
        if (search) {
            filter.$or = [
                { title: { $regex: search}},
                { clientName: { $regex: search} },
            ];
        }       
        const opportunities = await Opportunity.find(filter);
        return res.status(200).json({
            message: "Success",
            data: opportunities,
        });
    };


    public getOpportunityById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { id }: getOpportunityDTO = req.params;

        const opportunity = await Opportunity.findById(id);

        if (!opportunity) {
            throw new NotFoundError("Opportunity not found");
        }
        return res.status(200).json({
            message: "Success",
            data: opportunity,
        });
    };


    public updateOpportunity = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
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
                throw new BadRequestError("Opportunity cannot be marked as ready for analysis before adding requirements text or uploading files")
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
            throw new NotFoundError("Opportunity not found")
        }

        return res.status(200).json({
            message:
                "Opportunity updated successfully",

            data:
                opportunity,
        });
};

    public deleteOpportunity = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
        const { id } = req.params as { id: string };;

        const opportunity = await Opportunity.findById(id);

        if (!opportunity) {
            throw new NotFoundError("Opportunity not found");
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
    } 
};
export default new OpportunityService;