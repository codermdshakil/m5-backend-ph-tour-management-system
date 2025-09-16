import z from "zod";

export const createDivisionZodSchema = z.object({
  name: z
    .string({ message: "Name must be string" })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  slug: z
    .string({ message: "slug must be string" })
    .min(2, { message: "slug must be at least 2 characters long." })
    .max(50, { message: "slug cannot exceed 50 characters." }),
  thumbnail: z.string({ message: "Thumnail" }).optional(),
  description: z.string({message:"description is required!"})
});


export const updateDivisionZodSchema = z.object({
  name: z
    .string({ message: "Name must be string" })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  slug: z
    .string({ message: "slug must be string" })
    .min(2, { message: "slug must be at least 2 characters long." })
    .max(50, { message: "slug cannot exceed 50 characters." }),
  thumbnail: z
    .string({ message: "Thumnail" })
    .optional(),
  description: z
    .string({message:"description is required!"})
    .optional()
}) 