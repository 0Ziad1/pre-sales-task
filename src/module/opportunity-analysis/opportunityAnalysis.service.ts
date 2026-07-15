import type { NextFunction, Request, Response } from "express";
import { ai_agent } from "../../utils/AI/index.js";
import Opportunity from "../../model/opportunity/opportunity.model.js";
import { OpportunityAnalysis } from "../../model/opportunityAnalysis/opportunityAnalysis.model.js";
import RequirementFile from "../../model/requirementFile/requirementFile.model.js";
import OpportunityRequirement from "../../model/opportunityRequirements/opportunityRequirements.model.js";
import { extractTextFromFile } from "../../utils/read-files-data/extract-data-by-fileType.js";
import { extract_data } from "../../utils/read-files-data/collect-files-data.js";

class OpportunityAnalysisService {
    constructor() { }
    public analyzeOpportunity = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            const { id } = req.params as { id: string };

            const opportunity = await Opportunity.findById(id);
            const opportunityReqTxt = await OpportunityRequirement.findOne({ opportunityId: id }) as any;
            const requirementFiles = await RequirementFile.find({ opportunityId: id })
            if (!opportunity) {
                return res.status(404).json({
                    message: "Opportunity not found",
                });
            }

            const requirementsText =
                opportunityReqTxt.requirementsText || "";

            let extractedText = await extract_data(requirementFiles);


            // later you can add extracted file content here
            const fileContent = extractedText;

            const aiResponse = await ai_agent(
                opportunity,
                fileContent,
                requirementsText
            );

            let parsedAnalysis;
            try {
                const cleanJson = aiResponse
                    .replace(/```json/g, "")
                    .replace(/```/g, "")
                    .trim();

                parsedAnalysis = JSON.parse(cleanJson);
            } catch {
                return res.status(500).json({
                    message: "AI returned invalid JSON",
                    aiResponse,
                });
            }
            const analysis =
                await OpportunityAnalysis.create({
                    opportunityId: opportunity._id,
                    summary: parsedAnalysis.summary,
                    mainFeatures:
                        parsedAnalysis.mainFeatures,
                    technicalNeeds:
                        parsedAnalysis.technicalNeeds,
                    risks: parsedAnalysis.risks,
                    questions:
                        parsedAnalysis.questions,
                    complexity:
                        parsedAnalysis.complexity,
                    analyzedAt: new Date(),
                });

            return res.status(200).json({
                message: "Analysis generated successfully",
                data: analysis,
            });
        } catch (error) {
            next(error);
        }
    };
}
export default new OpportunityAnalysisService;