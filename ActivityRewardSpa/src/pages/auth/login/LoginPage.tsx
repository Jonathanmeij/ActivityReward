import { motion } from "framer-motion";
import LoginForm from "./LoginForm";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { AuthClient, LoginRequest } from "../../../clients/fitnesstrackerclient";
import { useNavigate } from "react-router-dom";

export const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
});

export default function LoginPage() {
    const [error, setError] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

    const authClient = useMemo(() => new AuthClient(import.meta.env.VITE_APIURL), []);

    const { mutate: login, isPending } = useMutation({
        mutationFn: async (loginRequest: LoginRequest) => {
            const result = await authClient.login(loginRequest);

            if (result.success) {
                navigate("/");
            } else {
                setError(result.message);
            }
        },
        onSuccess: () => {},
    });

    function onSubmit(values: z.infer<typeof loginFormSchema>) {
        login(
            new LoginRequest({
                email: values.email,
                password: values.password,
            })
        );
    }

    return <LoginForm isLoading={isPending} error={error} onSubmit={onSubmit} />;
}
