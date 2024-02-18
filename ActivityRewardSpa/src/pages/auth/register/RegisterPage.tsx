import { motion } from "framer-motion";
import RegisterForm from "./RegisterForm";
import { z } from "zod";
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AuthClient, RegisterRequest } from "@/clients/fitnesstrackerclient";
import { useNavigate } from "react-router-dom";

export const registerFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
    // .string()
    // .min(8)
    // .refine(
    //     (value) => /[A-Z]/.test(value),
    //     "Must contain at least 1 uppercase letter"
    // )
    // .refine(
    //     (value) => /[a-z]/.test(value),
    //     "Must contain at least 1 lowercase letter"
    // )
    // .refine((value) => /[0-9]/.test(value), "Must contain at least 1 number"),
});

export default function RegisterPage() {
    const [error, setError] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

    const authClient = useMemo(() => new AuthClient(import.meta.env.VITE_APIURL), []);

    const { mutate: register, isPending } = useMutation({
        mutationFn: async (registerRequest: RegisterRequest) => {
            const result = await authClient.register(registerRequest);

            if (result.success) {
                navigate("/intro", { replace: true });
            } else {
                setError(result.message);
            }
        },
        onSuccess: () => {
            console.log("success");
        },
    });

    function onSubmit(values: z.infer<typeof registerFormSchema>) {
        register(
            new RegisterRequest({
                email: values.email,
                password: values.password,
                username: values.email,
            })
        );
    }

    return <RegisterForm onSubmit={onSubmit} error={error} isLoading={isPending} />;
}
