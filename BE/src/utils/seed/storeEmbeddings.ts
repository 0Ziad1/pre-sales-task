import Opportunity from "../../model/opportunity/opportunity.model.js";
import { OpportunityEmbedding } from "../../model/opportunityEmbbedingSchema/opportunityEmbbedingSchema.model.js";
import OpportunityRequirement from "../../model/opportunityRequirements/opportunityRequirements.model.js";
import RequirementFile from "../../model/requirementFile/requirementFile.model.js";
import { extractTextFromFile } from "../read-files-data/extract-data-by-fileType.js";
import { flattenFile, flattenOpportunity } from "./flattenData.js";
import { generateEmbedding } from "./generateEmbeddings.js";

export async function storeEmbeddings() {


    const opportunities = await Opportunity.find();

    await OpportunityEmbedding.deleteMany({});

    const documents = [];

    for (const opportunity of opportunities) {



        const requirements =
            await OpportunityRequirement.findOne({
                opportunityId: opportunity._id,
            });





        const files = await RequirementFile.find({
            opportunityId: opportunity._id,
        });



        // Requirements
        if (requirements?.requirementsText?.trim()) {



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

        // Files
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


    }


    if (documents.length === 0) {
        throw new Error(
            "No embedding documents were generated"
        );
    }





    const inserted =
        await OpportunityEmbedding.insertMany(documents);



    return inserted;
}

