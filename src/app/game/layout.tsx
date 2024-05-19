'use client'
import TTMap from "../shared/components/map";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
            <TTMap />
        </>
    )
}