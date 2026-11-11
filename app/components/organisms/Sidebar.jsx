"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../atoms/Logo";
import Icon from "../atoms/Icon";

export default function Sidebar({ role = "Paciente" }) {
    const router = useRouter();
    const pathname = usePathname();

    const [usuario, setUsuario] = useState({
        nombre: "Invitado",
        rol: role,
        iniciales: "IN"
    });

    useEffect(() => {
        const sesion = JSON.parse(localStorage.getItem("usuarioActivo"));
        
        if (sesion && sesion.nombre) {
            const nombreCompleto = `${sesion.nombre || ""} ${sesion.apellido || ""}`.trim();
            const iniciales = nombreCompleto.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
            setUsuario({
                nombre: nombreCompleto,
                rol: sesion.rol || role,
                iniciales: iniciales || "US"
            });
        } else if (role === "Administrador") {
            setUsuario({ nombre: "Administrador", rol: "Administrador", iniciales: "AD" });
        } else if (role === "Nutricionista") {
            setUsuario({ nombre: "Camila Muñoz", rol: "Nutricionista", iniciales: "CM" });
        }
    }, [role]);

    function cerrarSesion() {
        localStorage.removeItem("token");
        localStorage.removeItem("usuarioActivo");
        router.push("/login");
    }

    const menus = {
        Paciente: [
            { label: "Mis citas", icon: "calendar", href: "/citas" },
            { label: "Mi progreso", icon: "chart", href: "/progreso" },
            { label: "Plan alimenticio", icon: "file", href: "/plan" },
            { label: "Mi perfil", icon: "user", href: "/perfil" },
        ],
        Nutricionista: [
            { label: "Resumen", icon: "home", href: "/nutricionista" },
            { label: "Mi agenda", icon: "calendar", href: "/agenda" },
            { label: "Mis pacientes", icon: "users", href: "/pacientes" },
        ],
        Administrador: [
            { label: "Resumen", icon: "home", href: "/admin" },
            { label: "Usuarios", icon: "users", href: "/usuarios" },
        ],
    };

    const menu = menus[usuario.rol] || menus[role] || menus.Paciente;

    const hrefsRepetidos = menu.filter((item) => item.href === pathname);

    return (
        <aside className="sidebar">
            <Logo onClick={() => router.push("/")} />

            <span className="role-label">MENÚ PRINCIPAL</span>

            <nav>
                {menu.map((item, index) => {
                    const esActivo =
                        pathname === item.href &&
                        (hrefsRepetidos.length === 1 || index === 0);

                    return (
                        <button
                            key={`${usuario.rol}-${item.label}`}
                            className={esActivo ? "active" : ""}
                            onClick={() => router.push(item.href)}
                        >
                            <Icon name={item.icon} />
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            <div className="sidebar-bottom">
                <button
                    onClick={() => {
                        const destino =
                            usuario.rol === "Administrador" ? "/admin"
                            : usuario.rol === "Nutricionista" ? "/nutricionista"
                            : "/perfil";
                        router.push(destino);
                    }}
                >
                    <Icon name="settings" />
                    Configuración
                </button>

                <button onClick={cerrarSesion}>
                    <Icon name="logout" />
                    Cerrar sesión
                </button>

                <div className="profile-mini">
                    <span>{usuario.iniciales}</span>
                    <div>
                        <b>{usuario.nombre}</b>
                        <small>{usuario.rol}</small>
                    </div>
                </div>
            </div>
        </aside>
    );
}