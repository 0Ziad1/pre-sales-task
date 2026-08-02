import { aiInit } from "../../config/AI.config.js";
export async function ai_agent(opportunity: any, file: any, requirementsText: string ) {

  
    const prompt = `
Analyze the following opportunity requirements.

Opportunity Information:
Title: ${opportunity.title}
Client: ${opportunity.clientName}

Requirements Text:
${requirementsText || "No requirements text provided"}

${file || "No extracted requirements text"}

Instructions:

1. Produce a business-oriented summary.
2. Extract the main requested features.
3. Infer possible technical requirements and architecture needs.
4. Identify unclear points, assumptions, dependencies, integrations, security concerns, scalability concerns, and missing information.
5. Generate questions that should be asked to the client before estimation.
6. Estimate implementation complexity:
   - low → simple CRUD or small system
   - medium → multiple modules or integrations
   - high → enterprise-level systems, many integrations, high scalability requirements

Return ONLY JSON.
`;
    const instructions = `
You are a senior Pre-Sales Solution Architect and Business Analyst.

Your task is to analyze client requirements and generate structured insights for the pre-sales team.

Goals:
1. Understand the client's business needs.
2. Identify requested features.
3. Infer possible technical requirements.
4. Detect ambiguities, risks, missing information, and assumptions.
5. Generate useful clarification questions.

Rules:
- Be concise but informative.
- Think from both business and technical perspectives.
- Infer hidden requirements when reasonable.
- Mention integration, security, scalability, reporting, roles, APIs, infrastructure, and non-functional requirements if implied.
- If information is missing, add it under risks and questions.
- Complexity must be one of:
  - low
  - medium
  - high

Return ONLY valid JSON.
Do NOT wrap the response inside markdown.
Do NOT add explanations outside JSON.

The JSON schema MUST be:

{
  "summary": "string",
  "mainFeatures": ["string"],
  "technicalNeeds": ["string"],
  "risks": ["string"],
  "questions": ["string"],
  "complexity": "low | medium | high"
}
`;
   return await aiInit(prompt,instructions);
}