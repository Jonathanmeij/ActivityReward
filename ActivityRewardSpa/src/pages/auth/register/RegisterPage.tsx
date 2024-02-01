import { motion } from "framer-motion";
import RegisterForm from "./RegisterForm";
import { z } from "zod";

export const registerFormSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(8)
        .refine(
            (value) => /[A-Z]/.test(value),
            "Must contain at least 1 uppercase letter"
        )
        .refine(
            (value) => /[a-z]/.test(value),
            "Must contain at least 1 lowercase letter"
        )
        .refine((value) => /[0-9]/.test(value), "Must contain at least 1 number"),
    confirmPassword: z
        .string()
        .min(8)
        .refine(
            (value) => /[A-Z]/.test(value),
            "Must contain at least 1 uppercase letter"
        )
        .refine(
            (value) => /[a-z]/.test(value),
            "Must contain at least 1 lowercase letter"
        )
        .refine((value) => /[0-9]/.test(value), "Must contain at least 1 number"),
});

export default function RegisterPage() {
    function onSubmit(values: z.infer<typeof registerFormSchema>) {
        console.log(values);
    }

    return (
        <motion.div
            key={"register"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="Register"
        >
            <RegisterForm onSubmit={onSubmit} />
        </motion.div>
    );
}
