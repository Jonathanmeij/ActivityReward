/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { cva, type VariantProps } from "class-variance-authority";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const containerStyles = cva(" ", {
    variants: {
        maxWidth: {
            none: "max-w-none",
            sm: "max-w-sm",
            md: "max-w-md",
            lg: "max-w-lg",
            xl: "max-w-xl",
            "2xl": "max-w-2xl",
            "3xl": "max-w-3xl",
            "4xl": "max-w-4xl",
            "5xl": "max-w-5xl",
            "6xl": "max-w-6xl",
            "7xl": "max-w-7xl",
            "8xl": "max-w-[90rem]",
            "9xl": "max-w-[100rem]",
            full: "max-w-full",
        },
        padding: {
            none: "px-0",
            normal: "px-4 md:px-6",
        },
    },
    defaultVariants: {
        maxWidth: "4xl",
        padding: "normal",
    },
});

interface ContainerProps extends VariantProps<typeof containerStyles> {
    children: React.ReactNode;
    className?: string;
}

export default function Container({
    children,
    className,
    maxWidth,
    padding,
}: ContainerProps) {
    return (
        <div className={`${className ?? ""} ${containerStyles({ maxWidth, padding })}`}>
            {children}
        </div>
    );
}
