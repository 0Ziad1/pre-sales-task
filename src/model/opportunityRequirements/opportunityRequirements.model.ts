import { model } from "mongoose";
import type { IOpportunityRequirement } from "../../utils/interfaces/index.js";
import { opportunityReqSchema } from "./opportunityRequirements.schema.js"; 

const  OpportunityRequirement = model<IOpportunityRequirement>("opportunityRequirement",opportunityReqSchema)
export default OpportunityRequirement;