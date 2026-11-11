"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../components/templates/DashboardLayout";
import PageTitle from "../components/molecules/PageTitle";
import Metric from "../components/molecules/Metric";
import Button from "../components/atoms/Button";
import Icon from "../components/atoms/Icon";
import { getAgendaNutricionista, actualizarEstadoCita } from "../utils/api";

function formatearFechaHoy() {
    const hoy = new Date();
    const texto = hoy.toLocaleDateString("es-CL", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export default function NutricionistaPage() {
    const [agenda, setAgenda] = useState([]);
    const [pacientesHoy, setPacientesHoy] = useState([]);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [accion, setAccion] = useState("");
    const [loading, setLoading] = useState(true);

    async function cargarDatos() {
        try {
            const data = await getAgendaNutricionista();
            
            const citasHoy = data.filter(c => {
                const fechaCita = new Date(c.fechaHora);
                const hoy = new Date();
                return fechaCita.toDateString() === hoy.toDateString();
            });

            const agendaFormateada = citasHoy.map(c => {
                const hora = new Date(c.fechaHora).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
                const iniciales = c.paciente.nombre[0] + c.paciente.apellido[0];
                return {
                    id: c.id,
                    hora: hora,
                    iniciales: iniciales.toUpperCase(),
                    paciente: c.paciente.nombre + " " + c.paciente.apellido,
                    motivo: c.servicio.nombre,
                    estado: c.estado
                };
            });

            const unicos = [];
            const vistos = new Set();
            citasHoy.forEach(c => {
                if (!vistos.has(c.paciente.id)) {
                    vistos.add(c.paciente.id);
                    unicos.push({
                        id: c.paciente.id,
                        iniciales: (c.paciente.nombre[0] + c.paciente.apellido[0]).toUpperCase(),
                        nombre: c.paciente.nombre + " " + c.paciente.apellido,
                        estado: c.servicio.nombre
                    });
                }
            });

            setAgenda(agendaFormateada);
            setPacientesHoy(unicos);
        } catch (error) {
            console.error("Error al cargar datos:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        cargarDatos();
    }, []);

    const pendientes = agenda.filter((c) => c.estado === "Pendiente").length;

    async function cambiarEstado(id, estadoActual) {
        const nuevoEstado = estadoActual === "Pendiente" ? "Confirmada" : "Completada";
        try {
            await actualizarEstadoCita(id, nuevoEstado);
            await cargarDatos();
        } catch (error) {
            alert("Error al actualizar el estado de la cita.");
        }
    }

    if (loading) {
        return (
            <DashboardLayout role="Nutricionista">
                <div style={{ padding: "50px", textAlign: "center" }}>Cargando agenda...</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout role="Nutricionista">
            <PageTitle
                title="Buenos días, Camila"
                subtitle="Aquí tienes un resumen de tu jornada."
                action={
                    <Button onClick={() => setAccion("Crear plan alimenticio")}>
                        <Icon name="plus" size={17} />
                        Crear plan
                    </Button>
                }
            />

            <div className="metric-grid four">
                <Metric icon="calendar" label="Citas de hoy" value={String(agenda.length)} detail="Pacientes agendados" />
                <Metric icon="users" label="Pacientes hoy" value={String(pacientesHoy.length)} detail="En el día" />
                <Metric icon="clock" label="Pendientes" value={String(pendientes)} detail="Por confirmar" />
                <Metric icon="check" label="Completadas" value={String(agenda.filter(c => c.estado === "Completada").length)} detail="Finalizadas" />
            </div>

            <div className="pro-dashboard-grid">
                <div className="panel">
                    <div className="panel-head">
                        <div>
                            <h2>Agenda de hoy</h2>
                            <p>{formatearFechaHoy()}</p>
                        </div>
                    </div>

                    <div className="schedule">
                        {agenda.length === 0 ? (
                            <p style={{ padding: "20px", color: "var(--text)" }}>No tienes citas agendadas para hoy.</p>
                        ) : (
                            agenda.map((cita) => (
                                <div className="schedule-row" key={cita.id}>
                                    <span className="schedule-time">{cita.hora}</span>
                                    <span className="avatar-soft">{cita.iniciales}</span>

                                    <div>
                                        <b>{cita.paciente}</b>
                                        <small>{cita.motivo}</small>
                                    </div>

                                    <span className={`status ${cita.estado === "Confirmada" || cita.estado === "Completada" ? "green" : "amber"}`}>
                                        {cita.estado}
                                    </span>

                                    <button className="small-outline" onClick={() => setPacienteSeleccionado(cita)}>
                                        Ver ficha
                                    </button>

                                    <button
                                        className="small-outline"
                                        onClick={() => cambiarEstado(cita.id, cita.estado)}
                                        style={cita.estado === "Pendiente" ? { borderColor: '#b4e0c3', color: '#1f6b4f', backgroundColor: '#f9fffb' } : { borderColor: '#cfd8e0', color: '#53655f', backgroundColor: '#f5f7f9' }}
                                    >
                                        {cita.estado === "Pendiente" ? "Confirmar" : "Completar"}
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="panel recent-patients">
                    <div className="panel-head">
                        <div>
                            <h2>Pacientes de hoy</h2>
                            <p>Citados para la jornada</p>
                        </div>
                    </div>

                    {pacientesHoy.length === 0 ? (
                        <p style={{ padding: "20px", color: "var(--text)", fontSize: "12px" }}>No hay pacientes.</p>
                    ) : (
                        pacientesHoy.map((paciente) => (
                            <div className="recent-row" key={paciente.id}>
                                <span className="avatar-soft">{paciente.iniciales}</span>
                                <div>
                                    <b>{paciente.nombre}</b>
                                    <small>{paciente.estado}</small>
                                </div>
                                <button onClick={() => setAccion(`Ficha de ${paciente.nombre}`)}>
                                    <Icon name="arrow" size={17} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {pacienteSeleccionado && (
                <div className="panel">
                    <div className="panel-head">
                        <div>
                            <h2>Ficha de la cita</h2>
                            <p>{pacienteSeleccionado.paciente}</p>
                        </div>
                        <button className="small-outline" onClick={() => setPacienteSeleccionado(null)}>
                            Cerrar
                        </button>
                    </div>
                    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                        <p style={{ fontSize: "14px" }}><b>Hora:</b> {pacienteSeleccionado.hora}</p>
                        <p style={{ fontSize: "14px" }}><b>Motivo:</b> {pacienteSeleccionado.motivo}</p>
                        <p style={{ fontSize: "14px" }}><b>Estado actual:</b> {pacienteSeleccionado.estado}</p>
                    </div>
                </div>
            )}

            {accion && (
                <div className="panel">
                    <div className="panel-head">
                        <div>
                            <h2>{accion}</h2>
                            <p>Funcionalidad simulada.</p>
                        </div>
                        <button className="small-outline" onClick={() => setAccion("")}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}