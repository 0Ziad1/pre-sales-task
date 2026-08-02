import type mongoose from "mongoose";
import type { STATUS_VAL } from "../../utils/enum/index.js";

export interface CreateOpportunityDTO  {
        title:string ;
        clientName:string;
        description:string;
        status:string;
}
export interface getAllOpportunitiesDTO{
        status?:STATUS_VAL,
        search?:string,
}
export interface getOpportunityDTO  {
        id?:mongoose.Types.ObjectId;
}