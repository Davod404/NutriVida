"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "../atoms/Logo";
import Icon from "../atoms/Icon";
import Navbar from "./Navbar";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="site-header">
            <div className="container header-inner">
                <Link href="/">
                    <Logo />
                </Link>

                <Navbar />

                <div className="header-actions">
                    <Link href="/agendar" className="btn-primary">
                        Agendar cita
                        <Icon name="arrow" size={18} />
                    </Link>
                </div>

                <button
                    className="menu-button"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <Icon name={menuOpen ? "close" : "menu"} />
                </button>

                {menuOpen && (
                    <nav className="main-nav open">
                        <Link href="/">Inicio</Link>
                        <Link href="/servicios">Servicios y planes</Link>
                        <button>Especialistas</button>

                        <Link href="/agendar" className="mobile-only">
                            Agendar cita
                            
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
}