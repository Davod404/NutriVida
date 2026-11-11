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
                    <Link 
                        href="/login" 
                        style={{ fontSize: "14px", fontWeight: "600", color: "var(--ink)", textDecoration: "none" }}
                    >
                        Iniciar sesión
                    </Link>
                    <Link href="/agendar" className="btn-primary" style={{ padding: "0 16px", minHeight: "40px" }}>
                        Agendar cita
                        <Icon name="arrow" size={18} />
                    </Link>
                </div>

                <button
                    className="menu-button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                >
                    <Icon name={menuOpen ? "close" : "menu"} />
                </button>

                {menuOpen && (
                    <nav className="main-nav open">
                        <Link href="/" onClick={() => setMenuOpen(false)}>
                            Inicio
                        </Link>
                        <Link href="/servicios" onClick={() => setMenuOpen(false)}>
                            Servicios y planes
                        </Link>
                        <Link href="/login" onClick={() => setMenuOpen(false)}>
                            Iniciar sesión
                        </Link>

                        <Link
                            href="/agendar"
                            className="mobile-only"
                            onClick={() => setMenuOpen(false)}
                        >
                            Agendar cita
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
}