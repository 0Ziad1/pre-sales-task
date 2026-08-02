import { Schema } from "mongoose";
import type { IRequirementFile } from "../../utils/interfaces/index.js";
import { ALLOWED_FILES } from "../../utils/enum/index.js";

export const requirementFileSchema = new Schema<IRequirementFile>({
    opportunityId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Opportunity",
    },
    originalName: {
        type: String,
        required: true,
        trim: true,
    },
    fileName: {
        type: String,
        required: true,
        trim: true,
    },
    filePath: {
        type: String,
        required: true,
        trim: true,
    },
    fileType: {
        type: String,
        enum: Object.values(ALLOWED_FILES),
        required:true,
    },
    fileSize: {
        type: Number,
        required: true,
        max: 5 * 1024 * 1024,

    }
})