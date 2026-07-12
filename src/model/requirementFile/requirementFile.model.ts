import { model } from "mongoose"
import type { IRequirementFile } from "../../utils/interfaces/index.js"
import { requirementFileSchema } from "./requirementFile.schema.js"

const RequirementFile = model<IRequirementFile>("requirementFile", requirementFileSchema);
export default RequirementFile; 