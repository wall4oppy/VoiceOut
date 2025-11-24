"use client"

import { motion, useInView, Variants } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface FadeInProps {
    children: React.ReactNode
    className?: string
    delay?: number
    duration?: number
    direction?: "up" | "down" | "left" | "right"
}

export function FadeIn({
    children,
    className,
    delay = 0,
    duration = 0.5,
    direction = "up",
}: FadeInProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    const directionOffset = {
        up: 20,
        down: -20,
        left: 20,
        right: -20,
    }

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: direction === "left" || direction === "right" ? directionOffset[direction] : 0, y: direction === "up" || direction === "down" ? directionOffset[direction] : 0 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

interface StaggerTextProps {
    text: string
    className?: string
    delay?: number
}

export function StaggerText({ text, className, delay = 0 }: StaggerTextProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: delay * i },
        }),
    }

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    }

    return (
        <motion.div
            ref={ref}
            style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={cn("flex flex-wrap", className)}
        >
            {text.split("").map((char, index) => (
                <motion.span variants={child} key={index}>
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.div>
    )
}
