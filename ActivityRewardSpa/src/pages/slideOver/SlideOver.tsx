import SlideOver from "@/components/SlideOver";
import { OpacityButton } from "@/components/ui/ButtonNew";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const root = document.getElementById("root") as HTMLElement;

export default function SlideOverPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [isOpen, setOpen] = useState(false);

    const slideOver = searchParams.get("slide-over");

    useEffect(() => {
        if (slideOver === "true") {
            setOpen(true);
        } else {
            setOpen(false);
            root.style.transform = `translateX(0%)`;
        }
    }, [slideOver]);

    return (
        <>
            <div className="p-4 mt-11">
                <OpacityButton
                    variant={"destructive"}
                    onClick={() => {
                        setSearchParams({ "slide-over": "true" });
                    }}
                >
                    Open slideOver
                </OpacityButton>
                {isOpen && (
                    <SlideOver onExitComplete={() => navigate(-1)}>
                        <div className="">
                            <div className="p-4">
                                <h1>Slide Over</h1>
                                <p>This is the slide over content</p>
                            </div>
                        </div>
                    </SlideOver>
                )}
            </div>
        </>
    );
}
