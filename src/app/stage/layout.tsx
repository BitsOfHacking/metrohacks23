'use client'

"use client"
import { Navbar, NavbarContent, NavbarItem, Link, NavbarBrand } from "@nextui-org/react"
import StageSyncLogo from "@/components/StageSyncLogo";
import { useState } from "react";
import DataContext from "@/components/DataContext";

export default function StageLayout({
    children,
}: {
    children: React.ReactNode
    }) {
    const [tData, setCurrentData] = useState(null);
    
    return (
        <>
            <Navbar css={{
                border: "$space solid transparent"
            }}>
                <NavbarBrand>
                    <Link href="/">
                        <StageSyncLogo />
                    </Link>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem >
                        <Link color="foreground" href="/stage">
                        Stage
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="/stage/dashboard">
                        Dashboard
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <DataContext.Provider value={{
                tData,
                setCurrentData
            }}>
                {children}
            </DataContext.Provider>
        </>
    )
}