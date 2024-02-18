import { OpacityButton } from "@/components/ui/ButtonNew";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const pages = [
    {
        title: "Welcome to Fitness Tracker",
        description:
            "Fitness Tracker is a simple and easy to use application to track your workouts and progress.",
        image: "/images/intro/1.png",
    },
    {
        title: "Track your workouts",
        description:
            "Fitness Tracker allows you to track your workouts and progress. You can add exercises and track your progress over time.",
        image: "/images/intro/2.png",
    },
    {
        title: "Track your progress",
        description:
            "Fitness Tracker allows you to track your workouts and progress. You can add exercises and track your progress over time.",
        image: "/images/intro/3.png",
    },
];

export default function IntroPages() {
    const [page, setPage] = useState({ page: 0, direction: 0 });

    function next() {
        if (page.page === 2) return;
        setPage((page) => ({ page: page.page + 1, direction: 1 }));
    }

    function previous() {
        if (page.page === 0) return;
        setPage((page) => ({ page: page.page - 1, direction: -1 }));
    }

    return (
        <div className="flex flex-col justify-between h-dvh">
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={page.page}
                    initial={{ x: page.direction * 100 + "%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -page.direction * 100 + "%", opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="h-full"
                >
                    <IntroPage {...pages[page.page]} />
                </motion.div>
            </AnimatePresence>
            <div className="flex p-4">
                <OpacityButton variant="ghost" onClick={previous}>
                    Previous
                </OpacityButton>
                <PageIndicator page={page.page} />
                <OpacityButton variant="ghost" onClick={next}>
                    Next
                </OpacityButton>
            </div>
        </div>
    );
}

interface IntroPageProps {
    title: string;
    description: string;
    image: string;
}

function IntroPage({ title, description, image }: IntroPageProps) {
    return (
        <div className="w-full p-4">
            <img className="mb-8" src={image} alt="" />
            <div className="flex flex-col items-center justify-center w-full h-full gap-4 text-center">
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="">{description}</p>
            </div>
        </div>
    );
}

function PageIndicator({ page }: { page: number }) {
    const PAGE_COUNT = 3;

    return (
        <div className="flex items-center justify-center w-full h-12">
            {Array.from({ length: PAGE_COUNT }).map((_, i) => (
                <div
                    key={i}
                    className={`size-2 mx-1 rounded-full ${
                        page === i ? "bg-orange-500" : "bg-zinc-600"
                    }`}
                ></div>
            ))}
        </div>
    );
}
