import {z} from "zod"
export const upsertRequirementSchema = z.object({
    requirementsText: z
        .string({
            error: "Requirements text is required",
        })
        .trim()
        .min(10, "Requirements text must be at least 10 characters"),
});