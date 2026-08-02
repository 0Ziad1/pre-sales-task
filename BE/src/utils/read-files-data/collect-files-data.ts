import { extractTextFromFile } from "./extract-data-by-fileType.js";

export async function extract_data(requirementFile:any) {
    let extractedText =""
    const failedFiles: string[] = [];

    for (const file of requirementFile) {
        try {
            const text =
                await extractTextFromFile(
                    file.filePath
                );

            extractedText += `
File Name: ${file.originalName}
${text}
`;


        } catch (err) {
            failedFiles.push(
                file.originalName
            );
        }
    }
    return extractedText;
}