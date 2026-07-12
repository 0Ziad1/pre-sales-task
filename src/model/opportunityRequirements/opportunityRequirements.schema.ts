import mongoose, { Schema } from "mongoose";
import type { IOpportunityRequirement } from "../../utils/interfaces/index.js";

export const opportunityReqSchema = new Schema<IOpportunityRequirement>({
    opportunityId:{
        unique:true,
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Opportunity"
    },
    requirementsText:{
        required:true,
        minlength:10,
        trim:true,
        type:String
    }
})