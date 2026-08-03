import { OpenAI } from "openai";
import { devConfig } from "./dev.env.js";

export async function aiInit() {
    const client = new OpenAI({
        baseURL:
            devConfig.AZURE_AI_ENDPOINT,
        apiKey: devConfig.AZURE_AI_API_KEY,
    });
    return client;
}



