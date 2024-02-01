import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";

export default function ResizablePanel({ children }: { children: React.ReactNode }) {
    const [ref, { height }] = useMeasure();
    return (
        <motion.div
            animate={{ height: height || "auto" }}
            className="relative overflow-hidden"
        >
            <AnimatePresence initial={false}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={JSON.stringify(children, ignoreCircularReferences())}
                >
                    <div
                        ref={ref}
                        className={`overflow-hidden ${height ? "absolute" : "relative"}`}
                    >
                        {children}
                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}

const ignoreCircularReferences = () => {
    const seen = new WeakSet();
    return (key: string, value: any) => {
        if (key.startsWith("_")) return; // Don't compare React's internal props.
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) return;
            seen.add(value);
        }
        return value;
    };
};
