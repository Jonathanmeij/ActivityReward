import { OpacityButton } from "@/components/ui/ButtonNew";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useState } from "react";
import useMeasure from "react-use-measure";

export default function HomePage() {
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <OpacityButton variant={"destructive"}>Add vehicle</OpacityButton>
        </div>
    );
}
