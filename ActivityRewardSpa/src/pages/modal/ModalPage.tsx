import { OpacityButton } from "@/components/ui/ButtonNew";
import Drawer, { DrawerBody, DrawerHeader } from "@/components/ui/Drawer";
import { useState } from "react";

export default function ModalPage() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex items-center justify-center w-screen bg-green-700 min-h-dvh">
            <OpacityButton onClick={() => setOpen(true)}>Open Modal</OpacityButton>
            <Drawer isOpen={open} onClose={() => setOpen(false)}>
                <DrawerHeader
                    title="Modal"
                    onClose={() => setOpen(false)}
                    onSecondaryAction={() => setOpen(false)}
                />
                <DrawerBody>
                    <div className="inline-flex items-center w-full px-3 text-sm rounded-lg text-zinc-500 bg-zinc-800 h-9">
                        search
                    </div>
                    <p className="mt-3">This is the modal content</p>
                </DrawerBody>
            </Drawer>
        </div>
    );
}
