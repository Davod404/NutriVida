"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
    { href: "/", label: "Inicio" },
    { href: "/servicios", label: "Servicios y planes" },
    { href: "/agendar", label: "Agendar cita" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="main-nav">
            {LINKS.map(({ href, label }) => {
                const isActive =
                    href === "/" ? pathname === "/" : pathname.startsWith(href);

                return (
                    <Link
                        key={href}
                        href={href}
                        className={isActive ? "active" : undefined}
                    >
                        {label}
                    </Link>
                );
            })}
        </nav>
    );
}