import { Navbar, NavbarContent, NavbarItem, Link } from "@nextui-org/react"

export default function StageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                    <Link color="foreground" href="/">
                        Home
                    </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                    <Link color="danger" href="/stage" aria-current="page">
                        Stage
                    </Link>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            {children}
        </>
    )
}