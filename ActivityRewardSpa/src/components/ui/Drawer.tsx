import {
    AnimatePresence,
    PanInfo,
    Variants,
    animate,
    motion,
    useMotionTemplate,
    useMotionValue,
    useMotionValueEvent,
    useTransform,
} from "framer-motion";
import { OpacityButton } from "./ButtonNew";
import { Modal, ModalOverlay } from "react-aria-components";
import { AnyPtrRecord } from "dns";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    topMargin?: number;
    hasHandle?: boolean;
    sheetRadius?: number;
}

const MotionModal = motion(Modal);
const MotionModalOverlay = motion(ModalOverlay);

const transition = {
    duration: 0.5,
    ease: [0.32, 0.72, 0, 1],
};

const inertiaTransition = {
    type: "inertia" as const,
    bounceStiffness: 300,
    bounceDamping: 40,
    timeConstant: 300,
};

const root = document.getElementById("root") as HTMLElement;
export default function Drawer({
    isOpen,
    onClose,
    children,
    topMargin = 100,
    sheetRadius = 12,
}: ModalProps) {
    const h = window.innerHeight - topMargin;
    const y = useMotionValue(h);
    const bgOpacity = useTransform(y, [0, h], [0.4, 0]);
    const bgFilter = useTransform(y, [0, h], [0.6, 1]);
    const bg = useMotionTemplate`rgba(0, 0, 0, ${bgOpacity})`;

    y.on("change", (latest) => console.log(latest));

    const handleDragEnd = (e: any, info: PanInfo) => {
        if (info.offset.y > h * 0.5 || info.velocity.y > 320) {
            onClose();
        } else {
            console.log("drag end");

            animate(y, 0, { ...inertiaTransition, min: 0, max: 0 });
        }
    };

    let bodyScale = useTransform(y, [0, h], [0.95, 1]);
    let bodyBorderRadius = useTransform(y, [0, h], [sheetRadius, 0]);

    useMotionValueEvent(bodyScale, "change", (v) => (root.style.scale = `${v}`));
    useMotionValueEvent(
        bodyBorderRadius,
        "change",
        (v) => ((root.style.borderRadius = `${v}px`), (root.style.overflow = "hidden"))
    );
    useMotionValueEvent(
        bgFilter,
        "change",
        (v) => (root.style.filter = `saturate(${v})`)
    );

    return (
        <div>
            <AnimatePresence mode="popLayout">
                {isOpen && (
                    <>
                        <MotionModalOverlay
                            // Force the modal to be open when AnimatePresence renders it.
                            isOpen
                            onOpenChange={() => {}}
                            className="fixed inset-0 z-10"
                            style={{ backgroundColor: bg as any }}
                        >
                            <MotionModal
                                initial={{ y: h }}
                                animate={{ y: 0 }}
                                exit={{ y: h }}
                                transition={transition}
                                drag="y"
                                dragConstraints={{ top: 0 }}
                                dragElastic={0.8}
                                onDragEnd={handleDragEnd}
                                style={{
                                    y,
                                    top: topMargin,
                                    paddingBottom: window.screen.height,
                                }}
                                className="absolute bottom-0 w-full rounded-t-lg shadow-lg bg-zinc-900"
                            >
                                {children}
                            </MotionModal>
                        </MotionModalOverlay>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

export function DrawerHeader({
    onClose,
    onSecondaryAction,
    title,
}: {
    onSecondaryAction?: () => void;
    onClose: () => void;
    title: string;
}) {
    return (
        <div className="flex items-center justify-between px-4 py-2">
            <OpacityButton
                className="py-2 font-normal text-red-500"
                variant={"ghost"}
                size={"ghost"}
                onClick={onClose}
            >
                Cancel
            </OpacityButton>
            <h1 className="text-lg font-semibold">{title}</h1>
            {onSecondaryAction ? (
                <OpacityButton
                    className="py-2 font-semibold text-red-500 hover:text-red-600!"
                    variant={"ghost"}
                    size={"ghost"}
                    onClick={onSecondaryAction}
                >
                    Save
                </OpacityButton>
            ) : (
                <div className="opacity-0">Cancel</div>
            )}
        </div>
    );
}

export function DrawerBody({ children }: { children: React.ReactNode }) {
    return <div className="px-4">{children}</div>;
}
