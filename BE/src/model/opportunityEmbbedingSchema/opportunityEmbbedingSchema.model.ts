import { model } from "mongoose";
import { opportunityEmbeddingSchema } from "./opportunityEmbbedingSchema.schema.js";

export const OpportunityEmbedding = model(
    "OpportunityEmbedding",
    opportunityEmbeddingSchema
);
