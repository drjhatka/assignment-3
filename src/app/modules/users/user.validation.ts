import { z } from "zod";

const createUserValidationSchema = z.object({
    name:z.string(),
    email:z.string().email("Valid Email Required"),
    password: z.string(),
    phone:z.string(),
    address:z.string(),
    role:z.enum(['admin', 'user'])
})
const updateUserValidationSchema = z.object({
    name:z.string().optional(),
    email:z.string().email("Valid Email Required").optional(),
    password: z.string().optional(),
    phone:z.string().optional(),
    address:z.string().optional(),
    role:z.enum(['admin', 'user']).optional()
})

export const UserValidation = {
    createUserValidationSchema,
    updateUserValidationSchema
}