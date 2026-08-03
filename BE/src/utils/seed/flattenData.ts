
import type { IOpportunity, IOpportunityRequirement } from "../interfaces/index.js";
export function flattenOpportunity(
    opportunity: IOpportunity,
    requirements?: IOpportunityRequirement,
): string {
    return `
Project: ${opportunity.title}
Client: ${opportunity.clientName}
Description: ${opportunity.description}

Requirements:
${requirements?.requirementsText ?? "None"}
`.trim();
}

export function flattenFile(
    fileName: string,
    fileType: string,
    content: string
): string {
    return `
Document: ${fileName}
Document Type: ${fileType}

Content:
${content}
`.trim();
}