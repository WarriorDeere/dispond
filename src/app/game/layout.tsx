'use client'

import { game } from "../emitter";
import TTMap from "../shared/components/map/map";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    game.emit('start', 'SAVEGAME_ID')
    return (
        <>
            {children}
            <TTMap />
        </>
    )
}