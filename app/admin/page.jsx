"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../components/templates/DashboardLayout";
import PageTitle from "../components/molecules/PageTitle";
import Metric from "../components/molecules/Metric";
import Button from "../components/atoms/Button";
import Icon from "../components/atoms/Icon";

export default function AdminResumenPage() {
    const router = useRouter();
    const [usuarios, setUsuarios] = useState([]);
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function cargarDatos() {
            try {
                const token = localStorage.getItem("token");
                
                // Cargar usuarios
                const resUsuarios = await fetch("http://localhost:8080/api/usuarios", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const dataUsuarios = await resUsuarios.json();
                setUsuarios(dataUsuarios);

                // Cargar citas (asumiendo que tienes un endpoint general, si no, lo dejamos vacío)
                // Si no tienes un endpoint de todas las citas, puedes comentar estas líneas.
                const resCitas = await fetch("http://localhost:8080/api/citas/todas", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (resCitas.ok) {
                    const dataCitas = await resCitas.json();
                    setCitas(dataCitas);
                }

            } catch (error) {
                console.error("Error al cargar datos:", error);
            } finally {
                setLoading(false);
            }
        }
        cargarDatos();
    }, []);

    if (loading) {
        return (
            <DashboardLayout role="Administrador">
                <div style={{ padding: "50px", textAlign: "center" }}>Cargando panel...</div>
            </DashboardLayout>
        );
    }

    const nutricionistas = usuarios.filter(u => u.rol === "Nutricionista");

    return (
        <DashboardLayout role="Administrador">
            <PageTitle
                title="Panel de administración"
                subtitle="Resumen general de la clínica."
                action={
                    <Button onClick={() => router.push("/admin/usuarios")}>
                        <Icon name="users" size={17} />
                        Gestionar usuarios
                    </Button>
                }
            />

            <div className="metric-grid four">
                <Metric icon="users" label="Usuarios totales" value={String(usuarios.length)} detail="En el sistema" />
                <Metric icon="user" label="Pacientes" value={String(usuarios.filter(u => u.rol === "Paciente").length)} detail="Registrados" />
                <Metric icon="heart" label="Nutricionistas" value={String(nutricionistas.length)} detail="En el equipo" />
                <Metric icon="calendar" label="Citas totales" value={String(citas.length)} detail="En la clínica" />
            </div>

            <div className="pro-dashboard-grid">
                <div className="panel">
                    <div className="panel-head">
                        <div>
                            <h2>Últimas citas</h2>
                            <p>Actividad reciente de la clínica</p>
                        </div>
                    </div>

                    <div className="appointments">
                        {citas.length === 0 ? (
                            <p style={{ padding: "20px", color: "var(--text)" }}>No hay citas registradas en la clínica.</p>
                        ) : (
                            citas.slice(0, 5).map((cita) => (
                                <div className="appointment" key={cita.id}>
                                    <div className="date-block" style={{ width: 'auto', padding: '0 15px', minWidth: '100px' }}>
                                        <span style={{ fontSize: '11px', fontWeight: 700 }}>
                                            {new Date(cita.fechaHora).toLocaleDateString("es-CL", { day: 'numeric', month: 'short' })}
                                        </span>
                                    </div>
                                    <div className="appointment-info">
                                        <h3>{cita.paciente.nombre} {cita.paciente.apellido}</h3>
                                        <p>con {cita.nutricionista.nombre} {cita.nutricionista.apellido}</p>
                                        <div>
                                            <span><Icon name="clock" size={15}/> {new Date(cita.fechaHora).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>
                                    <span className={`status ${cita.estado === "Pendiente" ? "amber" : "green"}`}>{cita.estado}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="panel recent-patients">
                    <div className="panel-head">
                        <div>
                            <h2>Nutricionistas</h2>
                            <p>Equipo de la clínica</p>
                        </div>
                    </div>

                    {nutricionistas.length === 0 ? (
                        <p style={{ padding: "20px", color: "var(--text)", fontSize: "12px" }}>No hay nutricionistas registrados.</p>
                    ) : (
                        nutricionistas.map((nutri) => (
                            <div className="recent-row" key={nutri.id}>
                                <span className="avatar-soft">{nutri.username.substring(0, 2).toUpperCase()}</span>
                                <div>
                                    <b>{nutri.username}</b>
                                    <small>{nutri.email}</small>
                                </div>
                                <span className={`status ${nutri.activo ? "green" : "gray"}`}>{nutri.activo ? "Activo" : "Inactivo"}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}