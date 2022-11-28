import {object, string, TypeOf} from "zod";


export const password = string()
    .min(1, 'Password is required')
    .min(2, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters')

export const passwordSchema = object({
    password
})

export const usernameSchema = object({
    login: string()
        .min(1,'Login is required')
        .max(32, 'Login must be less than 100 characters')
})

export const loginSchema = passwordSchema.merge(usernameSchema)

export type LoginInput = TypeOf<typeof loginSchema>;
