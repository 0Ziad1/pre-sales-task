import * as z from "zod";
import { STATUS_VAL } from "../../utils/enum/index.js";

export const createOpportunitySchema = z.object({
    title: z
        .string({ error: "Title is required" })
        .trim()
        .min(3, "Title must be at least 3 characters"),
    clientName: z
        .z.string({ error: "Client name is required" })
        .trim()
        .min(2, "Client name must be at least 2 characters")
        .max(30, "Client name cannot exceed 30 characters"),
    description: z
        .string()
        .optional(),

});

export const getOpportunitiesSchema = z.object({
    status: z
        .enum(Object.values(STATUS_VAL) as [string, ...string[]])
        .optional(),

    search: z
        .string()
        .trim()
        .min(1, "Search cannot be empty")
        .optional(),
});

export const updateOpportunitySchema = z
    .object({
        title: z
            .string({
                error: "Title must be a string",
            })
            .trim()
            .min(3, "Title must be at least 3 characters")
            .optional(),

        clientName: z
            .string({
                error: "Client name must be a string",
            })
            .trim()
            .min(2, "Client name must be at least 2 characters")
            .max(30, "Client name cannot exceed 30 characters")
            .optional(),

        description: z
            .string()
            .optional(),

       status: z
        .enum(Object.values(STATUS_VAL), {
            error: "Invalid status value",
        })
        .optional(),
    })
    .refine(
        data => Object.keys(data).length > 0,
        {
            message: "At least one field must be provided",
        }
    );