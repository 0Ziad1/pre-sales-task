import type { Request, Response } from "express";
import { generateEmbedding } from "../../utils/seed/generateEmbeddings.js";
import { searchSimilarDocuments } from "../../utils/rag/vectorSearch.service.js";
import { aiInit } from "../../config/AI.config.js";
import { storeEmbeddings } from "../../utils/seed/storeEmbeddings.js";
import { OpportunityEmbedding } from "../../model/opportunityEmbbedingSchema/opportunityEmbbedingSchema.model.js";
import { generateRagPrompt, instructions } from "../../utils/prompt-and-instrcutions/rag-prompt.js";

class RagService {
    constructor() { };

    public chatBot = async (
        req: Request,
        res: Response
    ) => {
        const firstDocument = await OpportunityEmbedding.findOne();
        const { question } = req.body;
        // await storeEmbeddings();

        if (!question?.trim()) {
            return res.status(400).json({
                message: "Question is required",
            });
        }

        // 1. Convert question to embedding
        const queryEmbedding =
            await generateEmbedding(question);

        // 2. Retrieve relevant documents
        const documents = await searchSimilarDocuments(queryEmbedding);
        // 3. Build context
        const context = documents
            .map((doc, index) => {
                return `
Document ${index + 1}:
${doc.text}
`;
            })
            .join("\n");

        // 4. Ask your existing AI
        const prompt = generateRagPrompt(context, question);
        const client = await aiInit();
        const answer = await client.responses.create({
            model: "DeepSeek-V3.2",
            instructions: instructions,
            input: prompt,
        });


        return res.status(200).json({
            answer: answer.output_text,
            sources: documents.map(doc => ({
                score: doc.score,
            })),
        });
    };
    public generateEmbeddings = async (
        req: Request,
        res: Response
    ) => {
        const documents = await storeEmbeddings();

        return res.status(200).json({
            message: "Embeddings generated successfully",
            count: documents.length,
        });
    };
}

export default new RagService();