import { z } from "zod";

export const SignUpSchema = z.object({
  firstname: z
    .string({
      required_error: "Firstname is required",
    })
    .trim()
    .min(1, {
      message: "Firstname is required",
    })
    .max(30, { message: "Firstname can not be more than 30 characters long" }),

  lastname: z
    .string({
      required_error: "Lastname is required",
    })
    .trim()
    .min(1, {
      message: "Lastname is required",
    })
    .max(30, { message: "Lastname can not be more than 30 characters long" }),

  username: z
    .string({ required_error: "Username must be string" })
    .trim()
    .min(1, {
      message: "Username is required",
    })
    .max(30, { message: "Username can not be more than 30 characters long" }),

  email: z
    .string({ required_error: "Email must be string" })
    .email({ message: "Invalid email format" })
    .trim()
    .min(1, { message: "Email is required" }),

  password: z.string().trim().min(1, { message: "Password is required" }),
});

export const SignInSchema = z.object({
  email: z
    .string({ required_error: "Email must be string" })
    .email({ message: "Invalid email format" })
    .trim()
    .min(1, { message: "Email is required" }),

  password: z.string().trim().min(1, { message: "Password is required" }),
});

export type SignUpType = z.infer<typeof SignUpSchema>;
export type SignInType = z.infer<typeof SignInSchema>;
