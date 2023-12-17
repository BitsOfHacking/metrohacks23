'use client'

import { Navbar, NavbarContent, NavbarItem, Link, NavbarBrand } from "@nextui-org/react"
import StageSyncLogo from "@/components/StageSyncLogo";

export default function StageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar css={{
                border: "$space solid transparent"
            }}>
                <NavbarBrand>
                    <StageSyncLogo/>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>

                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            {children}
        </>
    )
}