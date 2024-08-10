import z from 'zod';

export const signupTypes = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password should be minimum of 8 characters")

});

export const loginTypes = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string()
})