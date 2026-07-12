import { Schema } from "mongoose";
import { STATUS_VAL } from "../../utils/enum/index.js";
import type { IOpportunity } from "../../utils/interfaces/index.js";

export const opportunitySchema = new Schema<IOpportunity>({
    title :{
        type :String,
        required:true,
        minLength:3,
        trim:true,
    },
    clientName:{
        type:String,
        required:true,
        minLength:2,
        maxLength:30,
        trim:true,
    },
    description:{
        type:String,
    },
    status:{
        type:String,
        default:STATUS_VAL.new,
        enum:Object.values (STATUS_VAL)
    }
})