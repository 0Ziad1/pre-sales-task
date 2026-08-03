import Opportunity from "../../model/opportunity/opportunity.model.js";
import { OpportunityEmbedding } from "../../model/opportunityEmbbedingSchema/opportunityEmbbedingSchema.model.js";
import OpportunityRequirement from "../../model/opportunityRequirements/opportunityRequirements.model.js";
import RequirementFile from "../../model/requirementFile/requirementFile.model.js";
import { extractTextFromFile } from "../read-files-data/extract-data-by-fileType.js";
import { flattenFile, flattenOpportunity } from "./flattenData.js";
import { generateEmbedding } from "./generateEmbeddings.js";

async function storeEmbeddings() {
    // Get all opportunities
    const opportunities = await Opportunity.find();

    console.log(
        `📄 Loaded ${opportunities.length} opportunities`
    );

    const documents = [];

    for (const opportunity of opportunities) {

        // Get requirements
        const requirements =
            await OpportunityRequirement.findOne({
                opportunityId: opportunity._id,
            });

        // Get files
        const files = await RequirementFile.find({
            opportunityId: opportunity._id,
        });

        // -----------------------------
        // Requirements
        // -----------------------------

        if (requirements?.requirementsText) {

            const text = flattenOpportunity(
                opportunity,
                requirements
            );

            const embedding =
                await generateEmbedding(text);

            documents.push({
                opportunityId: opportunity._id,
                sourceType: "requirements",
                sourceId: requirements._id,
                text,
                embedding,
            });
        }

        // -----------------------------
        // Files
        // -----------------------------

        for (const file of files) {

            const content =
                await extractTextFromFile(file as any);

            if (!content?.trim()) {
                continue;
            }

            const text = flattenFile(
                file.fileName,
                file.fileType,
                content
            );

            const embedding =
                await generateEmbedding(text);

            documents.push({
                opportunityId: opportunity._id,
                sourceType: "file",
                sourceId: file._id,
                fileName: file.originalName,
                text,
                embedding,
            });
        }

        console.log(
            `✅ Processed ${opportunity.title}`
        );
    }
    //clear data base
    await OpportunityEmbedding.deleteMany({});

    // Store embeddings
    if (documents.length > 0) {
        await OpportunityEmbedding.insertMany(documents);
    }


    console.log(
        `🎯 Inserted ${documents.length} embeddings`
    );
}

