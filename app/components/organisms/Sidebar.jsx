"use client";

import { usePathname, useRouter } from "next/navigation";
import Logo from "../atoms/Logo";
import Icon from "../atoms/Icon";

export default function Sidebar({ role = "Paciente" }) {
    const router = useRouter();
    const pathname = usePathname();

    const menus = {
        Paciente: [
            {
                label: "Mis citas",
                icon: "calendar",
                href: "/citas",
            },
            {
                label: "Mi progreso",
                icon: "chart",
                href: "/progreso",
            },
            {
                label: "Plan alimenticio",
                icon: "file",
                href: "/plan",
            },
        ],

        Nutricionista: [
            {
                label: "Resumen",
                icon: "home",
                href: "/nutricionista",
            },
            {
                label: "Agenda",
                icon: "calendar",
                href: "/nutricionista",
            },
            {
                label: "Pacientes",
                icon: "users",
                href: "/nutricionista",
            },
            {
                label: "Planes alimenticios",
                icon: "file",
                href: "/nutricionista",
            },
        ],

        Administrador: [
            {
                label: "Resumen",
                icon: "home",
                href: "/admin",
            },
            {
                label: "Usuarios",
                icon: "users",
                href: "/admin",
            },
            {
                label: "Servicios",
                icon: "heart",
                href: "/admin",
            },
            {
                label: "Configuración",
                icon: "settings",
                href: "/admin",
            },
        ],
    };

    const profiles = {
        Paciente: {
            initials: "MC",
            name: "María Contreras",
        },

        Nutricionista: {
            initials: "CM",
            name: "Camila Muñoz",
        },

        Administrador: {
            initials: "AD",
            name: "Administrador",
        },
    };

    const menu = menus[role] || menus.Paciente;
    const profile = profiles[role] || profiles.Paciente;

    return (
        <aside className="sidebar">
            <Logo />

            <span className="role-label">
                MENÚ PRINCIPAL
            </span>

            <nav>
                {menu.map((item, index) => (
                    <button
                        key={`${role}-${item.label}`}
                        className={
                            pathname === item.href && index === 0
                                ? "active"
                                : ""
                        }
                        onClick={() => router.push(item.href)}
                    >
                        <Icon name={item.icon} />
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="sidebar-bottom">
                <button>
                    <Icon name="settings" />
                    Configuración
                </button>

                <button onClick={() => router.push("/login")}>
                    <Icon name="logout" />
                    Cerrar sesión
                </button>

                <div className="profile-mini">
                    <span>{profile.initials}</span>

                    <div>
                        <b>{profile.name}</b>
                        <small>{role}</small>
                    </div>
                </div>
            </div>
        </aside>
    );
}