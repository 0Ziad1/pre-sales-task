import { Schema, model } from "mongoose";
import type { IOpportunityAnalysis } from "../../utils/interfaces/index.js";
import { COMPLEXITY_VAL } from "../../utils/enum/index.js";


export const opportunityAnalysisSchema =
    new Schema<IOpportunityAnalysis>(
        {
            opportunityId: {
                type: Schema.Types.ObjectId,
                ref: "Opportunity",
                required: true,
            },

            summary: {
                type: String,
                required: true,
                trim: true,
            },

            mainFeatures: {
                type: [String],
                required: true,
                default: [],
            },

            technicalNeeds: {
                type: [String],
                required: true,
                default: [],
            },

            risks: {
                type: [String],
                required: true,
                default: [],
            },

            questions: {
                type: [String],
                required: true,
                default: [],
            },

            complexity: {
                type: String,
                enum: Object.values(COMPLEXITY_VAL),
                required: true,
            },

            analyzedAt: {
                type: Date,
                default: Date.now,
            },
        },{
            timestamps:true,
        }
    );

