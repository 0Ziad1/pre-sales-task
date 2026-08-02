import z from "zod";

export const uploadRequirementFileschema = z.object({
    originalname:
        z.string(),

    mimetype:
        z.enum([
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain",
        ]),

    size: z.number()
        .max(
            5 * 1024 * 1024,
            "File size must not exceed 5 MB"
        ),
});