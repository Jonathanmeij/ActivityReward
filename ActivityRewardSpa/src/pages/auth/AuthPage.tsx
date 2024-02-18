import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import RegisterPage from "./register/RegisterPage";
import { OpacityButton } from "@/components/ui/ButtonNew";

export default function AuthPage() {
    const route = useLocation();

    return (
        <div className="fixed flex flex-col items-center justify-center w-screen overflow-hidden h-dvh lg:p-2 lg:px-2 lg:flex-row">
            <div className="w-full h-full p-4">
                <MotionConfig transition={{ duration: 0.2 }}>
                    <AnimatePresence mode="popLayout" initial={false}>
                        {route.pathname === "/auth/login" && (
                            <motion.div
                                key="login"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full"
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
                                className="h-full"
                            >
                                <RegisterPage />
                            </motion.div>
                        )}
                        {route.pathname === "/auth" && (
                            <motion.div
                                key="start"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full"
                            >
                                <StartScreen />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </MotionConfig>
            </div>
        </div>
    );
}

function StartScreen() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-between h-full">
            <div></div>
            <h1 className="text-3xl font-bold text-center text-pretty">
                Turn Your Actions <br /> into Rewards
            </h1>
            <div className="flex flex-col w-full gap-4 max-w-96">
                <OpacityButton
                    className="w-full"
                    onClick={() => navigate("/auth/register", { replace: true })}
                >
                    Sign up
                </OpacityButton>
                <OpacityButton
                    variant="secondary"
                    className="w-full"
                    onClick={() => navigate("/auth/login", { replace: true })}
                >
                    Log in
                </OpacityButton>
            </div>
        </div>
    );
}
