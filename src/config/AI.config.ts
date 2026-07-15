import { OpenAI } from "openai";
import { devConfig } from "./dev.env.js";

export async function aiInit(prompt:string,instructions:string) {
    const client = new OpenAI({
        baseURL:
            "https://presales-ai-26-resource.services.ai.azure.com/openai/v1",
        apiKey: devConfig.API_KEY,
    });

    const response = await client.responses.create({
        model: "DeepSeek-V3.2",
        instructions: instructions,
        input: prompt,
    });
    return response.output_text;
}



