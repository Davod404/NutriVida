"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import DashboardLayout from "../components/templates/DashboardLayout";
import PageTitle from "../components/molecules/PageTitle";
import Metric from "../components/molecules/Metric";
import Button from "../components/atoms/Button";
import Icon from "../components/atoms/Icon";

const upcoming = [
    {
        id: 1,
        date: "24",
        month: "JUN",
        title: "Control nutricional",
        doctor: "Camila Muñoz",
        time: "10:30",
        mode: "Presencial",
        status: "Confirmada",
    },
    {
        id: 2,
        date: "08",
        month: "JUL",
        title: "Seguimiento Plan Equilibrio",
        doctor: "Camila Muñoz",
        time: "16:00",
        mode: "Online",
        status: "Pendiente",
    },
];

const previous = [
    {
        id: 3,
        date: "10",
        month: "JUN",
        title: "Control nutricional",
        doctor: "Camila Muñoz",
        time: "11:00",
        mode: "Presencial",
        status: "Completada",
    },
    {
        id: 4,
        date: "27",
        month: "MAY",
        title: "Evaluación nutricional",
        doctor: "Camila Muñoz",
        time: "09:30",
        mode: "Presencial",
        status: "Completada",
    },
];

export default function CitasPage() {
    const router = useRouter();

    const [tab, setTab] = useState("proximas");
    const [citas, setCitas] = useState(upcoming);

    function cancelarCita(id) {
        setCitas(
            citas.filter((appointment) => appointment.id !== id)
        );
    }

    const appointments =
        tab === "proximas"
            ? citas
            : previous;

    return (
        <DashboardLayout>
            <div>
                <PageTitle
                    title="Mis citas"
                    subtitle="Revisa y gestiona tus próximas atenciones."
                    action={
                        <Button
                            onClick={() => router.push("/agendar")}
                        >
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
                    value={
                        citas.length > 0
                            ? `${citas[0].date} ${citas[0].month.toLowerCase()}`
                            : "Sin citas"
                    }
                    detail={
                        citas.length > 0
                            ? `a las ${citas[0].time}`
                            : "Agenda una nueva cita"
                    }
                />

                <Metric
                    icon="check"
                    label="Citas completadas"
                    value="8"
                    detail="durante este año"
                />

                <Metric
                    icon="clock"
                    label="Horas de atención"
                    value="7,5 h"
                    detail="en total"
                />
            </div>

            <div className="panel">
                <div className="panel-head">
                    <div>
                        <h2>
                            {tab === "proximas"
                                ? "Próximas citas"
                                : "Citas anteriores"}
                        </h2>

                        <p>
                            {tab === "proximas"
                                ? `Tienes ${citas.length} atenciones agendadas`
                                : "Revisa tus atenciones anteriores"}
                        </p>
                    </div>

                    <div className="tabs">
                        <button
                            className={
                                tab === "proximas"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setTab("proximas")
                            }
                        >
                            Próximas
                        </button>

                        <button
                            className={
                                tab === "anteriores"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setTab("anteriores")
                            }
                        >
                            Anteriores
                        </button>
                    </div>
                </div>

                <div className="appointments">
                    {appointments.length === 0 ? (
                        <div className="info-note">
                            No tienes citas en esta sección.
                        </div>
                    ) : (
                        appointments.map((appointment) => (
                            <div
                                className="appointment"
                                key={appointment.id}
                            >
                                <div className="date-block">
                                    <b>{appointment.date}</b>
                                    <span>{appointment.month}</span>
                                </div>

                                <div className="appointment-info">
                                    <span
                                        className={`status ${
                                            appointment.status === "Confirmada" ||
                                            appointment.status === "Completada"
                                                ? "green"
                                                : "amber"
                                        }`}
                                    >
                                        {appointment.status}
                                    </span>

                                    <h3>
                                        {appointment.title}
                                    </h3>

                                    <p>
                                        con {appointment.doctor}
                                    </p>

                                    <div>
                                        <span>
                                            <Icon
                                                name="clock"
                                                size={15}
                                            />
                                            {appointment.time}
                                        </span>

                                        <span>
                                            <Icon
                                                name="home"
                                                size={15}
                                            />
                                            {appointment.mode}
                                        </span>
                                    </div>
                                </div>

                                {tab === "proximas" && (
                                    <div className="appointment-actions">
                                        <Button
                                            secondary
                                            onClick={() =>
                                                router.push("/agendar")
                                            }
                                        >
                                            Reprogramar
                                        </Button>

                                        <button
                                            onClick={() =>
                                                cancelarCita(
                                                    appointment.id
                                                )
                                            }
                                        >
                                            Cancelar cita
                                        </button>

                                        <button className="more">
                                            •••
                                        </button>
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