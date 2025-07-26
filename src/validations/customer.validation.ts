import { z } from "zod";

export const customerSchema = z.object({
    fullname: z.string()
        .min(1, { message: "Full name is required." }),

    email: z.string()
        .min(1, { message: "Email is required." })
        .email({ message: "Please enter a valid email address." }),

    gender: z.string().min(1, { message: "Gender is required." })
        .refine((val) => val === "Male" || val === "Female", { message: "Gender must be either Male or Female." }),

    password: z.string()
        .min(6, { message: "Password must be at least 6 characters." })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
            { message: "Password must contain 1 uppercase, 1 lowercase, and 1 number." }
        ),

    confirmPassword: z.string()
        .min(6, { message: "Please confirm your password." }),

    phone: z.string()
        .min(10, { message: "Phone number must be 10 digits." })
        .max(10, { message: "Phone number must be 10 digits." })
        .regex(/^\d{10}$/, { message: "Invalid phone number format." }),

    address: z.string()
        .min(1, { message: "Address is required." }),

    dob: z.string()
        .min(1, { message: "Date of birth is required." })
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Please enter a valid date."
        }),

    lat: z.string()
        .min(1, { message: "Latitude is required." })
        .regex(/^-?\d+(\.\d+)?$/, { message: "Latitude must be a valid number." }),

    lng: z.string()
        .min(1, { message: "Longitude is required." })
        .regex(/^-?\d+(\.\d+)?$/, { message: "Longitude must be a valid number." }),

    browserInfo: z.string()
        .min(1, { message: "Browser information is required." })
})
    .strict()
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export type Customer = z.infer<typeof customerSchema>;
