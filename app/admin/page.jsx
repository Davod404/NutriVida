"use client";

import { useState } from "react";

import DashboardLayout from "../components/templates/DashboardLayout";
import PageTitle from "../components/molecules/PageTitle";
import Metric from "../components/molecules/Metric";
import Button from "../components/atoms/Button";
import Icon from "../components/atoms/Icon";

const usuariosIniciales = [
    [
        "MS",
        "Martina Soto",
        "martina@correo.cl",
        "Paciente",
        "Activo",
        "Hoy, 09:42",
        "12 Ene 2025",
    ],
    [
        "CM",
        "Camila Muñoz",
        "camila@nutrivida.cl",
        "Nutricionista",
        "Activo",
        "Hoy, 08:15",
        "04 Mar 2023",
    ],
    [
        "DA",
        "Diego Alarcón",
        "diego@correo.cl",
        "Paciente",
        "Activo",
        "Ayer, 19:20",
        "18 Jun 2025",
    ],
    [
        "PS",
        "Paula San Martín",
        "paula@nutrivida.cl",
        "Nutricionista",
        "Activo",
        "Ayer, 17:48",
        "10 Ago 2023",
    ],
    [
        "JV",
        "Jorge Valdés",
        "jorge@correo.cl",
        "Paciente",
        "Inactivo",
        "12 May 2025",
        "06 Feb 2024",
    ],
];

export default function AdminPage() {
    const [usuarios, setUsuarios] = useState(usuariosIniciales);
    const [busqueda, setBusqueda] = useState("");
    const [rol, setRol] = useState("Todos");
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    const usuariosFiltrados = usuarios.filter((usuario) => {
        const texto = busqueda.toLowerCase();

        const coincideBusqueda =
            usuario[1].toLowerCase().includes(texto) ||
            usuario[2].toLowerCase().includes(texto);

        const coincideRol =
            rol === "Todos" || usuario[3] === rol;

        return coincideBusqueda && coincideRol;
    });

    function cambiarEstado(nombre) {
        setUsuarios(
            usuarios.map((usuario) => {
                if (usuario[1] === nombre) {
                    const nuevoEstado =
                        usuario[4] === "Activo"
                            ? "Inactivo"
                            : "Activo";

                    return [
                        ...usuario.slice(0, 4),
                        nuevoEstado,
                        ...usuario.slice(5),
                    ];
                }

                return usuario;
            })
        );
    }

    return (
        <DashboardLayout role="Administrador">
            <PageTitle
                title="Panel de administración"
                subtitle="Gestiona la clínica y revisa su actividad."
                action={
                    <Button
                        onClick={() =>
                            setUsuarioSeleccionado("nuevo")
                        }
                    >
                        <Icon name="plus" size={17} />
                        Crear usuario
                    </Button>
                }
            />

            <div className="metric-grid four">
                <Metric
                    icon="users"
                    label="Usuarios totales"
                    value="1.284"
                    detail="+38 este mes"
                />

                <Metric
                    icon="user"
                    label="Pacientes activos"
                    value="1.196"
                    detail="93% del total"
                />

                <Metric
                    icon="calendar"
                    label="Citas este mes"
                    value="326"
                    detail="+12% vs. mayo"
                />

                <Metric
                    icon="heart"
                    label="Profesionales"
                    value="12"
                    detail="10 activos hoy"
                />
            </div>

            <div className="panel users-panel">
                <div className="panel-head">
                    <div>
                        <h2>Gestión de usuarios</h2>
                        <p>
                            Administra cuentas, roles y estados
                        </p>
                    </div>

                    <div className="table-actions">
                        <div className="table-search">
                            <Icon
                                name="search"
                                size={17}
                            />

                            <input
                                placeholder="Buscar usuario..."
                                value={busqueda}
                                onChange={(e) =>
                                    setBusqueda(e.target.value)
                                }
                            />
                        </div>

                        <select
                            className="filter-button"
                            value={rol}
                            onChange={(e) =>
                                setRol(e.target.value)
                            }
                        >
                            <option value="Todos">
                                Todos los roles
                            </option>

                            <option value="Paciente">
                                Pacientes
                            </option>

                            <option value="Nutricionista">
                                Nutricionistas
                            </option>
                        </select>
                    </div>
                </div>

                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Rol</th>
                                <th>Estado</th>
                                <th>Último acceso</th>
                                <th>Fecha de registro</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {usuariosFiltrados.map((usuario) => (
                                <tr key={usuario[2]}>
                                    <td>
                                        <div className="table-user">
                                            <span>
                                                {usuario[0]}
                                            </span>

                                            <div>
                                                <b>
                                                    {usuario[1]}
                                                </b>

                                                <small>
                                                    {usuario[2]}
                                                </small>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <span
                                            className={`role-tag ${
                                                usuario[3] ===
                                                "Nutricionista"
                                                    ? "purple"
                                                    : ""
                                            }`}
                                        >
                                            {usuario[3]}
                                        </span>
                                    </td>

                                    <td>
                                        <span
                                            className={`status ${
                                                usuario[4] === "Activo"
                                                    ? "green"
                                                    : "gray"
                                            }`}
                                        >
                                            {usuario[4]}
                                        </span>
                                    </td>

                                    <td>{usuario[5]}</td>

                                    <td>{usuario[6]}</td>

                                    <td>
                                        <button
                                            className="icon-button"
                                            onClick={() =>
                                                setUsuarioSeleccionado(
                                                    usuario
                                                )
                                            }
                                        >
                                            <Icon
                                                name="edit"
                                                size={17}
                                            />
                                        </button>

                                        <button
                                            className="more"
                                            onClick={() =>
                                                cambiarEstado(
                                                    usuario[1]
                                                )
                                            }
                                        >
                                            •••
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {usuariosFiltrados.length === 0 && (
                    <div className="info-note">
                        No se encontraron usuarios.
                    </div>
                )}

                <div className="table-footer">
                    <span>
                        Mostrando {usuariosFiltrados.length} usuarios
                    </span>

                    <div>
                        <button>‹</button>
                        <button className="active">1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>…</button>
                        <button>257</button>
                        <button>›</button>
                    </div>
                </div>
            </div>

            {usuarioSeleccionado && (
                <div className="panel">
                    <div className="panel-head">
                        <div>
                            <h2>
                                {usuarioSeleccionado === "nuevo"
                                    ? "Crear usuario"
                                    : "Editar usuario"}
                            </h2>

                            <p>
                                {usuarioSeleccionado === "nuevo"
                                    ? "Registro de un nuevo usuario."
                                    : usuarioSeleccionado[1]}
                            </p>
                        </div>

                        <button
                            className="small-outline"
                            onClick={() =>
                                setUsuarioSeleccionado(null)
                            }
                        >
                            Cerrar
                        </button>
                    </div>

                    {usuarioSeleccionado !== "nuevo" && (
                        <div className="summary-row">
                            <span>Estado</span>

                            <b>
                                {usuarioSeleccionado[4]}
                            </b>
                        </div>
                    )}
                </div>
            )}
        </DashboardLayout>
    );
}