import { Schema } from "mongoose";

export const opportunityEmbeddingSchema = new Schema({
    opportunityId: {
        type: Schema.Types.ObjectId,
        ref: "Opportunity",
        required: true,
    },

    sourceType: {
        type: String,
        enum: ["requirements", "file"],
        required: true,
    },
    sourceId: {
        type: Schema.Types.ObjectId,
        required: true,
    },

    fileName: {
        type: String,
    },

    text: {
        type: String,
        required: true,
    },

    embedding: {
        type: [Number],
        required: true,
    },
});
