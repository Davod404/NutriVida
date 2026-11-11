"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../components/templates/DashboardLayout";
import PageTitle from "../components/molecules/PageTitle";
import Button from "../components/atoms/Button";
import Icon from "../components/atoms/Icon";
import { getAgendaNutricionista } from "../utils/api";

export default function AgendaPage() {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function cargarCitas() {
            try {
                const data = await getAgendaNutricionista();
                const formateadas = data.map(c => {
                    const fechaObj = new Date(c.fechaHora);
                    return {
                        id: c.id,
                        fecha: fechaObj.toLocaleDateString("es-CL", { weekday: 'long', day: 'numeric', month: 'long' }),
                        hora: fechaObj.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
                        paciente: c.paciente.nombre + " " + c.paciente.apellido,
                        motivo: c.servicio.nombre,
                        estado: c.estado
                    };
                });
                setCitas(formateadas);
            } catch (error) {
                console.error("Error al cargar agenda:", error);
            } finally {
                setLoading(false);
            }
        }
        cargarCitas();
    }, []);

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
                title="Mi agenda completa"
                subtitle="Todas tus citas agendadas, pasadas y futuras."
            />

            <div className="panel">
                <div className="panel-head">
                    <div>
                        <h2>Historial de citas</h2>
                        <p>Tienes {citas.length} citas en total</p>
                    </div>
                </div>

                <div className="appointments">
                    {citas.length === 0 ? (
                        <div style={{ padding: "40px", textAlign: "center", color: "var(--text)" }}>
                            <Icon name="calendar" size={40} style={{ color: "var(--line)", margin: "0 auto 16px" }} />
                            <p style={{ fontSize: "14px" }}>No tienes citas registradas.</p>
                        </div>
                    ) : (
                        citas.map((cita) => (
                            <div className="appointment" key={cita.id}>
                                <div className="date-block" style={{ width: 'auto', padding: '0 15px', minWidth: '120px' }}>
                                    <span style={{ fontSize: '11px', fontWeight: 700 }}>{cita.fecha}</span>
                                </div>

                                <div className="appointment-info">
                                    <span className={`status ${cita.estado === "Confirmada" || cita.estado === "Completada" ? "green" : "amber"}`}>
                                        {cita.estado}
                                    </span>
                                    <h3>{cita.paciente}</h3>
                                    <p>{cita.motivo}</p>
                                    <div>
                                        <span>
                                            <Icon name="clock" size={15} />
                                            {cita.hora}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}