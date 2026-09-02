import type { ElementType, ReactNode } from "react";
import { useReveal, revealClass } from "./useReveal";

export function Reveal({
    as,
    delay = 0,
    className = "",
    children,
}: {
    as?: ElementType;
    delay?: number;
    className?: string;
    children: ReactNode;
}) {
    const Tag = (as ?? "div") as ElementType;
    const { ref, visible } = useReveal<HTMLElement>();

    return (
        <Tag
            ref={ref as never}
            style={{ transitionDelay: `${delay}ms` }}
            className={`${revealClass(visible)} ${className}`}
        >
            {children}
        </Tag>
    );
}
