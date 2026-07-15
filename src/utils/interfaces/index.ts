import type mongoose from "mongoose";
import type { ALLOWED_FILES, STATUS_VAL } from "../enum/index.js";

export interface IOpportunity {
    title: string,
    clientName: string,
    description: string,
    status: STATUS_VAL,
}
export interface IOpportunityRequirement {
    opportunityId: mongoose.Types.ObjectId,
    requirementsText: string,
}
export interface IRequirementFile {
    opportunityId: mongoose.Types.ObjectId,
    originalName:string,
    fileName:string,
    filePath:string,
    fileType:ALLOWED_FILES,
    fileSize: number;
}
export interface IOpportunityAnalysis {
    opportunityId: mongoose.Types.ObjectId;
    summary: string;
    mainFeatures: string[];
    technicalNeeds: string[];
    risks: string[];
    questions: string[];
    complexity: "low" | "medium" | "high";
    analyzedAt: Date;
}