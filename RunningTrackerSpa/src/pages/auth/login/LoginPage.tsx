import { motion } from "framer-motion";
import LoginForm from "./LoginForm";
import { z } from "zod";

export const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export default function LoginPage() {
    function onSubmit(values: z.infer<typeof loginFormSchema>) {
        console.log(values);
    }

    return (
        <motion.div
            key={"login"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="Login"
        >
            <LoginForm onSubmit={onSubmit} />
        </motion.div>
    );
}
