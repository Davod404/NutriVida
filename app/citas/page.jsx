"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import DashboardLayout from "../components/templates/DashboardLayout";
import PageTitle from "../components/molecules/PageTitle";
import Metric from "../components/molecules/Metric";
import Button from "../components/atoms/Button";
import Icon from "../components/atoms/Icon";
import { getMisCitas, cancelarCita } from "../utils/api";

export default function CitasPage() {
    const router = useRouter();

    const [tab, setTab] = useState("proximas");
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);

    async function cargarCitas() {
        try {
            const data = await getMisCitas();
            
            const citasFormateadas = data.map((c) => {
                const fechaObj = new Date(c.fechaHora);
                return {
                    id: c.id,
                    code: c.servicio.codigo,
                    fechaReal: fechaObj, 
                    date: fechaObj.getDate().toString().padStart(2, '0'),
                    month: fechaObj.toLocaleString('es-CL', { month: 'short' }).toUpperCase().replace('.', ''),
                    title: c.servicio.nombre,
                    doctor: c.nutricionista.nombre + " " + c.nutricionista.apellido,
                    time: fechaObj.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
                    mode: c.servicio.modalidad,
                    status: c.estado,
                };
            });

            citasFormateadas.sort((a, b) => a.fechaReal - b.fechaReal);
            setCitas(citasFormateadas);
        } catch (error) {
            console.error("Error al cargar citas:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        cargarCitas();
    }, []);

    async function handleCancelar(id) {
        if (!window.confirm("¿Estás seguro de que quieres cancelar esta cita?")) return;
        
        try {
            await cancelarCita(id);
            await cargarCitas();
        } catch (error) {
            alert("Error al cancelar la cita.");
        }
    }

    const citasProximas = citas.filter(c => c.status === "Pendiente" || c.status === "Confirmada");
    const citasAnteriores = citas.filter(c => c.status === "Completada" || c.status === "Cancelada");

    const appointments = tab === "proximas" ? citasProximas : citasAnteriores;
    const proxima = citasProximas[0];

    if (loading) {
        return (
            <DashboardLayout>
                <div style={{ padding: "50px", textAlign: "center" }}>Cargando citas...</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div>
                <PageTitle
                    title="Mis citas"
                    subtitle="Revisa y gestiona tus próximas atenciones."
                    action={
                        <Button onClick={() => router.push("/agendar")}>
                            <Icon name="plus" size={17} />
                            Nueva cita
                        </Button>
                    }
                />
            </div>

            <div className="metric-grid patient-metrics">
                <Metric
                    icon="calendar"
                    label="Próxima cita"
                    value={proxima ? `${proxima.date} ${proxima.month}` : "Sin citas"}
                    detail={proxima ? `a las ${proxima.time}` : "Agenda una nueva cita"}
                />

                <Metric
                    icon="check"
                    label="Citas completadas"
                    value="0"
                    detail="durante este año"
                />

                <Metric
                    icon="clock"
                    label="Horas de atención"
                    value="0 h"
                    detail="en total"
                />
            </div>

            <div className="panel">
                <div className="panel-head">
                    <div>
                        <h2>{tab === "proximas" ? "Próximas citas" : "Citas anteriores"}</h2>
                        <p>
                            {tab === "proximas"
                                ? `Tienes ${citasProximas.length} atenciones agendadas`
                                : `Tienes ${citasAnteriores.length} atenciones anteriores`}
                        </p>
                    </div>

                    <div className="tabs">
                        <button
                            className={tab === "proximas" ? "active" : ""}
                            onClick={() => setTab("proximas")}
                        >
                            Próximas
                        </button>
                        <button
                            className={tab === "anteriores" ? "active" : ""}
                            onClick={() => setTab("anteriores")}
                        >
                            Anteriores
                        </button>
                    </div>
                </div>

                <div className="appointments">
                    {appointments.length === 0 ? (
                        <div style={{ padding: "40px", textAlign: "center", color: "var(--text)" }}>
                            <Icon name="calendar" size={40} style={{ color: "var(--line)", margin: "0 auto 16px" }} />
                            <p style={{ margin: "0 0 16px 0", fontSize: "14px" }}>
                                No tienes citas en esta sección.
                            </p>
                            <Button onClick={() => router.push("/agendar")}>
                                Agendar una cita
                            </Button>
                        </div>
                    ) : (
                        appointments.map((appointment) => (
                            <div className="appointment" key={appointment.id}>
                                <div className="date-block">
                                    <b>{appointment.date}</b>
                                    <span>{appointment.month}</span>
                                </div>

                                <div className="appointment-info">
                                    <span className={`status ${appointment.status === "Confirmada" || appointment.status === "Completada" ? "green" : "amber"}`}>
                                        {appointment.status}
                                    </span>
                                    <h3>{appointment.title}</h3>
                                    <p>con {appointment.doctor}</p>
                                    <div>
                                        <span>
                                            <Icon name="clock" size={15} />
                                            {appointment.time}
                                        </span>
                                        <span>
                                            <Icon name="home" size={15} />
                                            {appointment.mode}
                                        </span>
                                    </div>
                                </div>

                                {tab === "proximas" && (
                                    <div className="appointment-actions">
                                        <Button
                                            variant="secondary"
                                            onClick={() => router.push(`/agendar?servicio=${appointment.code}`)}
                                        >
                                            Reprogramar
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleCancelar(appointment.id)}
                                        >
                                            Cancelar cita
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}