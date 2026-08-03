import { model } from "mongoose";
import { opportunityEmbeddingSchema } from "./opportunityEmbbedingSchema.schema.js";
// to handle duplicates
opportunityEmbeddingSchema.index(
    {
        opportunityId: 1,
        sourceType: 1,
        sourceId: 1,
    },
    {
        unique: true,
    }
);
export const OpportunityEmbedding = model(
    "OpportunityEmbedding",
    opportunityEmbeddingSchema
);
