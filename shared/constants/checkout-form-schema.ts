import { z } from "zod";

export const checkoutFormSchema = z.object({
    email: z.string().email("Invalid email address").min(2, "Email must be at least 2 characters long"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z.string().min(10, "Phone number must be at least 10 digits long"),
    address: z.string().min(1, "Address is required"),
    comment: z.string().optional()
});

export type CheckoutFormFields = z.infer<typeof checkoutFormSchema>;