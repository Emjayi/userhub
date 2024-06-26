import { cn } from "@/utils/cn";
import { Button } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";


export const HoverEffect = ({
    items,
    className,
}: {
    items: {
        first_name: string;
        last_name: string;
        email: string;
        id: string;
        avatar: string
    }[];
    className?: string;
}) => {
    const [deleted, isDeleted] = useState(false)
    const handleDeleteUser = () => {
        isDeleted(true)
    }
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 grid-rows-1  py-5",
                className
            )}
        >
            {items.map((item, idx) => (
                <><Link
                    href={`/${item.id}`}
                    key={item?.id}
                    className="relative group block p-2 h-52 w-[350px]"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                }} />
                        )}
                    </AnimatePresence>
                    <Card>
                        <CardImage href={item.avatar}></CardImage>
                        <div>
                            <CardTitle>{item.first_name} {item.last_name}</CardTitle>
                            <CardDescription>{item.email}</CardDescription>
                        </div>
                    </Card>
                </Link><Button color="danger" onClick={handleDeleteUser} className="z-50 absolute right-0">delete</Button></>
            ))}
        </div>
    );
};

export const Card = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "rounded-2xl flex justify-center items-center h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
                className
            )}
        >
            <div className="relative z-50">
                <div className="p-4 flex gap-2">{children}</div>
            </div>
        </div>
    );
};
export const CardTitle = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
            {children}
        </h4>
    );
};
export const CardDescription = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <p
            className={cn(
                "mt-4 text-zinc-400 tracking-wide leading-relaxed text-sm",
                className
            )}
        >
            {children}
        </p>
    );
};
export const CardImage = ({
    className,
    href,
}: {
    className?: string;
    href: string | undefined;
}) => {
    return (
        <img src={href} width={100} height={100} alt="avatar" />
    );
};
