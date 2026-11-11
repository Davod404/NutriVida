"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "../organisms/Sidebar";

export default function DashboardLayout({ children, role = "Paciente" }) {
    const router = useRouter();
    const pathname = usePathname();
    const [cargando, setCargando] = useState(true);
    const verificacionHecha = useRef(false);

    useEffect(() => {
        // Si ya verificamos, no hacemos nada (evita el bucle)
        if (verificacionHecha.current) return;

        const sesion = localStorage.getItem("usuarioActivo");

        if (!sesion) {
            verificacionHecha.current = true;
            router.push(`/login?redirect=${pathname}`);
        } else {
            verificacionHecha.current = true;
            setCargando(false);
        }
    }, [pathname, router]);

    if (cargando) {
        return (
            <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f5f8f6' }}>
                <p style={{ color: 'var(--green)', fontWeight: 'bold' }}>Cargando...</p>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <Sidebar role={role} />
            <main className="dash-main">
                {children}
            </main>
        </div>
    );
}