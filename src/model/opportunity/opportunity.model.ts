import { model } from "mongoose";
import type { IOpportunity } from "../../utils/interfaces/index.js";
import { opportunitySchema } from "./opportunity.schema.js";
const Opportunity = model<IOpportunity>("opportunity",opportunitySchema)
export default Opportunity;