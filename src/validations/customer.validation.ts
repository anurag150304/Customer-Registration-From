import { z } from "zod";

export const customerSchema = z.object({
    // Full name validation: must be a non-empty string
    fullname: z.string()
        .min(1, { message: "Full name is required." }),

    // Email validation: must be a non-empty string and a valid email format
    email: z.string()
        .min(1, { message: "Email is required." })
        .email({ message: "Please enter a valid email address." }),

    // Gender validation: must be either "Male" or "Female"
    gender: z.string().min(1, { message: "Gender is required." })
        .refine((val) => val === "Male" || val === "Female", { message: "Gender must be either Male or Female." }),

    // Password validation: must be at least 6 characters and include uppercase, lowercase, and a number
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters." })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
            { message: "Password must contain 1 uppercase, 1 lowercase, and 1 number." }
        ),

    // Confirm password validation: must match the password
    confirmPassword: z.string()
        .min(6, { message: "Please confirm your password." }),

    // Phone number validation: must be exactly 10 digits
    phone: z.string()
        .min(10, { message: "Phone number must be 10 digits." })
        .max(10, { message: "Phone number must be 10 digits." })
        .regex(/^\d{10}$/, { message: "Invalid phone number format." }),

    // Address validation: must be a non-empty string
    address: z.string()
        .min(1, { message: "Address is required." }),

    // Date of birth validation: must be a valid date string
    dob: z.string()
        .min(1, { message: "Date of birth is required." })
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Please enter a valid date."
        }),

    // Latitude validation: must be a valid number in string format
    lat: z.string()
        .min(1, { message: "Latitude is required." })
        .regex(/^-?\d+(\.\d+)?$/, { message: "Latitude must be a valid number." }),

    // Longitude validation: must be a valid number in string format
    lng: z.string()
        .min(1, { message: "Longitude is required." })
        .regex(/^-?\d+(\.\d+)?$/, { message: "Longitude must be a valid number." }),

    // Browser information validation: must be a non-empty string
    browserInfo: z.string()
        .min(1, { message: "Browser information is required." })
})
    .strict() // Ensures no extra fields are allowed
    .refine((data) => data.password === data.confirmPassword, {
        // Custom validation to ensure passwords match
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

// Exporting the Customer type inferred from the schema
export type Customer = z.infer<typeof customerSchema>;
