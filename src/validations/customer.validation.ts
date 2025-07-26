import { z } from "zod";

export const customerSchema = z.object({
    // Full name validation: must be a non-empty string
    fullname: z.string()
        .min(1, { error: "Full name is required." }),

    // Email validation: must be a non-empty string and a valid email format
    email: z.email({ error: "Please enter a valid email address." }),

    // Gender validation: must be either "Male" or "Female"
    gender: z.string().min(1, { error: "Gender is required." })
        .refine((val) => val === "Male" || val === "Female", { error: "Gender must be either Male or Female." }),

    // Password validation: must be at least 6 characters and include uppercase, lowercase, and a number
    password: z.string()
        .min(6, { error: "Password must be at least 6 characters." })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
            { error: "Password must contain 1 uppercase, 1 lowercase, and 1 number." }
        ),

    // Confirm password validation: must match the password
    confirmPassword: z.string()
        .min(6, { error: "Please confirm your password." }),

    // Phone number validation: must be exactly 10 digits
    phone: z.string()
        .min(10, { error: "Phone number must be 10 digits." })
        .max(10, { error: "Phone number must be 10 digits." })
        .regex(/^\d{10}$/, { error: "Invalid phone number format." }),

    // Address validation: must be a non-empty string
    address: z.string()
        .min(1, { error: "Address is required." }),

    // Date of birth validation: must be a valid date string
    dob: z.string()
        .min(1, { error: "Date of birth is required." })
        .refine((val) => !isNaN(Date.parse(val)), {
            error: "Please enter a valid date."
        }),

    // Latitude validation: must be a valid number in string format
    lat: z.string()
        .min(1, { error: "Latitude is required." })
        .regex(/^-?\d+(\.\d+)?$/, { error: "Latitude must be a valid number." }),

    // Longitude validation: must be a valid number in string format
    lng: z.string()
        .min(1, { error: "Longitude is required." })
        .regex(/^-?\d+(\.\d+)?$/, { error: "Longitude must be a valid number." }),

    // Browser information validation: must be a non-empty string
    browserInfo: z.string()
        .min(1, { error: "Browser information is required." })
})
    .strict() // Ensures no extra fields are allowed
    .refine((data) => data.password === data.confirmPassword, {
        // Custom validation to ensure passwords match
        error: "Passwords do not match.",
        path: ["confirmPassword"],
    });

// Exporting the Customer type inferred from the schema
export type Customer = z.infer<typeof customerSchema>;
