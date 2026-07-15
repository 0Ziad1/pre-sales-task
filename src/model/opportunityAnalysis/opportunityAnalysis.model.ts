import { model } from "mongoose";
import { opportunityAnalysisSchema } from "./opportunityAnalysis.schema.js";
import type { IOpportunityAnalysis } from "../../utils/interfaces/index.js";

export const OpportunityAnalysis = model<IOpportunityAnalysis>(
    "OpportunityAnalysis",
    opportunityAnalysisSchema
);