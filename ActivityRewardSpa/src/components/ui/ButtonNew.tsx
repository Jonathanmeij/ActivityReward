import React from "react";
import type { ButtonProps } from "react-aria-components";
import { ButtonContext, useContextProps } from "react-aria-components";
import { useButton } from "react-aria";
import { MotionProps, motion, useAnimation } from "framer-motion";
import { FocusRing } from "react-aria";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md md:text-sm  font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ",
    {
        variants: {
            variant: {
                default:
                    "bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90",
                destructive:
                    "bg-red-500 text-zinc-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90",
                outline:
                    "border border-zinc-200 bg-white shadow-sm hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
                secondary:
                    "bg-zinc-100 text-zinc-900 shadow-sm hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
                ghost: "md:hover:bg-zinc-100 md:hover:text-zinc-900 md:dark:hover:bg-zinc-800 md:dark:hover:text-zinc-50",
                link: "text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50",
            },
            size: {
                default: "h-11 md:h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
                ghost: "",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

type ButtonProps2 = Omit<ButtonProps, "children"> & {
    children: React.ReactNode;
    onClick?: () => void;
    isLoading?: boolean;
};

interface OpacityButtonProps extends ButtonProps2, VariantProps<typeof buttonVariants> {}

type MotionButtonProps = Omit<MotionProps, "onAnimationStart">;

export const OpacityButton = React.forwardRef(
    (props: OpacityButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
        let controls = useAnimation();
        [props, ref] = useContextProps(props, ref, ButtonContext);
        const { buttonProps } = useButton(
            {
                onPress: props.onClick,
                onPressStart: () => {
                    controls.stop();
                    controls.set({ opacity: 0.7 });
                },
                onPressEnd: () => {
                    controls.start({
                        opacity: 1,
                        transition: { duration: 0.2 },
                    });
                },
            },
            ref
        );
        const { onAnimationStart, ...restButtonProps } = buttonProps;

        return (
            <FocusRing focusRingClass="ring ring-offset-2 ring-offset-black">
                <motion.button
                    {...(restButtonProps as MotionButtonProps)}
                    ref={ref}
                    animate={controls}
                    type={props.type || "button"}
                    disabled={props.isDisabled}
                    style={{
                        WebkitTapHighlightColor: "transparent",
                    }}
                    className={cn(
                        buttonVariants({ variant: props.variant, size: props.size }),
                        props.className
                    )}
                >
                    {props.isLoading ? <Spinner /> : null}
                    {props.children}
                </motion.button>
            </FocusRing>
        );
    }
);

OpacityButton.displayName = "AnimatedButton";

function Spinner() {
    return (
        <div
            className="inline-block mr-2 h-5 w-5 animate-spin rounded-full border-[3px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
        >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
            </span>
        </div>
    );
}
