"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
    const [isClicking, setIsClicking] = useState(false)
    const [isHovering, setIsHovering] = useState(false)

    // Use motion values for better performance than state
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    // Smooth spring animation for the follower
    const springConfig = { damping: 25, stiffness: 700 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)

            // Check if hovering over clickable elements
            const target = e.target as HTMLElement
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') !== null ||
                target.closest('button') !== null ||
                target.getAttribute('role') === 'button'

            setIsHovering(!!isClickable)
        }

        const handleMouseDown = () => setIsClicking(true)
        const handleMouseUp = () => setIsClicking(false)

        window.addEventListener("mousemove", moveCursor)
        window.addEventListener("mousedown", handleMouseDown)
        window.addEventListener("mouseup", handleMouseUp)

        return () => {
            window.removeEventListener("mousemove", moveCursor)
            window.removeEventListener("mousedown", handleMouseDown)
            window.removeEventListener("mouseup", handleMouseUp)
        }
    }, [cursorX, cursorY])

    // Hide cursor on touch devices to prevent double cursor
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null
    }

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            {/* Minimal Ring Cursor */}
            <motion.div
                className="absolute h-6 w-6 rounded-full border-2 border-foreground"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                    mixBlendMode: "difference",
                }}
                animate={{
                    scale: isClicking ? 0.6 : isHovering ? 1.8 : 1,
                    borderWidth: isClicking ? 3 : isHovering ? 1.5 : 2,
                }}
                transition={{ duration: 0.15, ease: "easeOut" }}
            />
        </div>
    )
}
