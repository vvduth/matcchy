import { z } from "zod";
import { calAge } from "./util";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must more than 6 characters",
  }),
  name: z.string().min(3),
});

export const profileSchema = z.object({
  gender: z.string().min(1),
  description: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  dateOfBirth: z.string().min(1, {
    message: 'Date of birth is required'
  }).refine(dateString =>  {
    const age = calAge(new Date(dateString))
    return age >= 18
  }, {
    message: 'Comeback when you are 18 years old'
  }),
});

export const combineRegisterSchema = registerSchema.and(profileSchema)

export type ProfileSchema = z.infer<typeof profileSchema>;

export type RegisterSchema = z.infer<typeof registerSchema & typeof profileSchema>;
