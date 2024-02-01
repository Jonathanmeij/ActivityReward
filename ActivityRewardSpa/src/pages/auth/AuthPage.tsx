import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import RegisterPage from "./register/RegisterPage";

export default function AuthPage() {
    const route = useLocation();

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen lg:p-2 lg:px-2 lg:flex-row">
            <div className="w-full">
                <MotionConfig transition={{ duration: 0.2 }}>
                    <AnimatePresence mode="wait" initial={false}>
                        {route.pathname === "/auth/login" && (
                            <motion.div
                                key="login"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <LoginPage />
                            </motion.div>
                        )}
                        {route.pathname === "/auth/register" && (
                            <motion.div
                                key="register"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <RegisterPage />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </MotionConfig>
            </div>
        </div>
    );
}

// {route.pathname === "/auth/login" && (
//     <motion.div
//         key="login"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//     >
//         <LoginPage />
//     </motion.div>
// )}
// {route.pathname === "/auth/register" && (
//     <motion.div
//         key="register"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//     >
//         <RegisterPage />
//     </motion.div>
// )}
