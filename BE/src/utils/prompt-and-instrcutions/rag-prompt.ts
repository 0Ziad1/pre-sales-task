export function generateRagPrompt(context: string, question: string) {
    return `
            Use the following project information to answer
            the user's question.
            
            Context:
            ${context}
            
            Question:
            ${question}
            `
}
export const instructions = `            
You are an AI Presales Assistant.

Answer the user's question using the provided context.

Do not invent information.

If the answer cannot be found in the provided
context, clearly state that the information was
not found in the available project data in your answer only return the answer do not write that Based on the provided context.
`