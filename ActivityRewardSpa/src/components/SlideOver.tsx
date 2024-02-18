import {
    motion,
    AnimatePresence,
    useMotionValue,
    useTransform,
    useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";
import { OpacityButton } from "./ui/ButtonNew";
import * as Portal from "@radix-ui/react-portal";

const transition = {
    duration: 0.5,
    ease: [0.32, 0.72, 0, 1],
};

const root = document.getElementById("root") as HTMLElement;

export default function SlideOver({
    onExitComplete,
    children,
}: {
    onExitComplete: () => void;
    children: React.ReactNode;
}) {
    const [isOpen, setOpen] = useState(true);
    const x = window.innerWidth;
    const width = useMotionValue(x);

    const bodyTranslateX = useTransform(width, [0, x], [-0.3, 0]);

    useMotionValueEvent(bodyTranslateX, "change", (v) => {
        root.style.transform = `translateX(${v * 100}%)`;
    });

    return (
        <div className="w-screen ">
            <AnimatePresence>
                {isOpen && (
                    <Portal.Root>
                        <motion.div
                            initial={{ x: x }}
                            animate={{ x: 0 }}
                            exit={{ x }}
                            transition={transition}
                            style={{ x: width }}
                            className="fixed top-0 left-0 w-screen h-full bg-zinc-900"
                            onAnimationComplete={(e: { x: any }) => {
                                if (e.x === x) {
                                    onExitComplete();
                                    setOpen(true);
                                    root.style.transform = `translateX(0%)`;
                                }
                            }}
                        >
                            <div className="fixed top-0 left-0 w-screen bg-black bg-opacity-80 backdrop-blur-lg standalone:pt-12 ">
                                <div className="flex border-b border-zinc-800 items-center justify-between h-[3.3rem] px-2">
                                    <OpacityButton
                                        className="py-2 font-normal text-blue-400"
                                        variant={"ghost"}
                                        size={"ghost"}
                                        onClick={() => setOpen(false)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.75 19.5 8.25 12l7.5-7.5"
                                            />
                                        </svg>
                                        Back
                                    </OpacityButton>
                                </div>
                            </div>
                            <div className="mt-[3.3rem] standalone:mt-[6.3rem]">
                                {children}
                            </div>
                        </motion.div>
                    </Portal.Root>
                )}
            </AnimatePresence>
        </div>
    );
}
