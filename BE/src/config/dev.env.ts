import { config } from "dotenv";
config();
export const devConfig ={
    PORT:process.env.PORT,
    MONGODB_URI:process.env.MONGODB_URI,
    JWT_SECRET:process.env.JWT_SECRET,
    AZURE_AI_API_KEY:process.env.AZURE_AI_API_KEY,
    AZURE_AI_ENDPOINT:process.env.AZURE_AI_ENDPOINT
} 