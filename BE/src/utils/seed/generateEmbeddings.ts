import { aiInit } from "../../config/AI.config.js";

export async function generateEmbedding(text: string) {
    if (!text?.trim()) {
        throw new Error("Text is required to generate embedding");
    }

    const client = await aiInit();

    const response = await client.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
    });

    const embedding = response.data[0]?.embedding;

    if (!embedding) {
        throw new Error("No embedding was returned");
    }

    return embedding;
}