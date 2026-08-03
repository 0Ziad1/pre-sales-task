import { OpportunityEmbedding } from "../../model/opportunityEmbbedingSchema/opportunityEmbbedingSchema.model.js";

export async function searchSimilarDocuments(
    queryEmbedding: number[]
) {

    return OpportunityEmbedding.aggregate([
        {
            $vectorSearch: {
                index: "opportunity_vector_index",
                path: "embedding",
                queryVector: queryEmbedding,
                numCandidates: 50,
                limit: 5,
            },
        },
        {
            $project: {
                _id: 0,
                opportunityId: 1,
                sourceType: 1,
                sourceId: 1,
                fileName: 1,
                text: 1,
                score: {
                    $meta: "vectorSearchScore",
                },
            },
        },
    ]);
}