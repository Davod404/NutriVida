"use client";

import { useState } from "react";

import DashboardLayout from "../components/templates/DashboardLayout";
import PageTitle from "../components/molecules/PageTitle";
import Metric from "../components/molecules/Metric";
import Button from "../components/atoms/Button";
import Icon from "../components/atoms/Icon";

const agendaInicial = [
    ["09:00", "MS", "Martina Soto", "Control nutricional", "Confirmada"],
    ["10:30", "DA", "Diego Alarcón", "Evaluación inicial", "Confirmada"],
    ["12:00", "JD", "Josefa Díaz", "Seguimiento online", "Pendiente"],
    ["15:30", "FT", "Felipe Torres", "Control deportivo", "Confirmada"],
];

const pacientes = [
    ["MR", "María Rodríguez", "Meta cumplida", "green"],
    ["JP", "Joaquín Pérez", "Plan por revisar", "amber"],
    ["CS", "Carolina Silva", "Nueva medición", "blue"],
];

const accesos = [
    ["users", "Buscar paciente"],
    ["file", "Crear plan"],
    ["chart", "Registrar medición"],
    ["calendar", "Bloquear horario"],
];

export default function NutricionistaPage() {
    const [agenda, setAgenda] = useState(agendaInicial);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [accion, setAccion] = useState("");

    function cambiarEstado(index) {
        const nuevaAgenda = [...agenda];

        nuevaAgenda[index] = [
            ...nuevaAgenda[index],
        ];

        nuevaAgenda[index][4] =
            nuevaAgenda[index][4] === "Confirmada"
                ? "Pendiente"
                : "Confirmada";

        setAgenda(nuevaAgenda);
    }

    return (
        <DashboardLayout role="Nutricionista">
            <PageTitle
                title="Buenos días, Camila"
                subtitle="Aquí tienes un resumen de tu jornada."
                action={
                    <Button
                        onClick={() =>
                            setAccion("Registrar medición")
                        }
                    >
                        <Icon name="plus" size={17} />
                        Registrar medición
                    </Button>
                }
            />

            <div className="metric-grid four">
                <Metric
                    icon="calendar"
                    label="Citas de hoy"
                    value="6"
                    detail="Primera a las 09:00"
                />

                <Metric
                    icon="users"
                    label="Pacientes activos"
                    value="42"
                    detail="+3 este mes"
                />

                <Metric
                    icon="clock"
                    label="Pendientes"
                    value="4"
                    detail="Planes por actualizar"
                />

                <Metric
                    icon="chart"
                    label="Adherencia promedio"
                    value="86%"
                    detail="+4% este mes"
                />
            </div>

            <div className="pro-dashboard-grid">
                <div className="panel">
                    <div className="panel-head">
                        <div>
                            <h2>Agenda de hoy</h2>
                            <p>Martes, 24 de junio</p>
                        </div>

                        <button
                            className="text-link"
                            onClick={() =>
                                setAccion("Agenda completa")
                            }
                        >
                            Ver agenda completa
                            <Icon name="arrow" size={15} />
                        </button>
                    </div>

                    <div className="schedule">
                        {agenda.map((cita, index) => (
                            <div
                                className="schedule-row"
                                key={cita[0]}
                            >
                                <span className="schedule-time">
                                    {cita[0]}
                                </span>

                                <span className="avatar-soft">
                                    {cita[1]}
                                </span>

                                <div>
                                    <b>{cita[2]}</b>
                                    <small>{cita[3]}</small>
                                </div>

                                <span
                                    className={`status ${
                                        cita[4] === "Confirmada"
                                            ? "green"
                                            : "amber"
                                    }`}
                                >
                                    {cita[4]}
                                </span>

                                <button
                                    className="small-outline"
                                    onClick={() =>
                                        setPacienteSeleccionado(cita[2])
                                    }
                                >
                                    Ver ficha
                                </button>

                                <button
                                    className="more"
                                    onClick={() =>
                                        cambiarEstado(index)
                                    }
                                >
                                    •••
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="panel recent-patients">
                    <div className="panel-head">
                        <div>
                            <h2>Pacientes recientes</h2>
                            <p>Actividad de esta semana</p>
                        </div>
                    </div>

                    {pacientes.map((paciente) => (
                        <div
                            className="recent-row"
                            key={paciente[1]}
                        >
                            <span className="avatar-soft">
                                {paciente[0]}
                            </span>

                            <div>
                                <b>{paciente[1]}</b>
                                <small>{paciente[2]}</small>
                            </div>

                            <button
                                onClick={() =>
                                    setPacienteSeleccionado(
                                        paciente[1]
                                    )
                                }
                            >
                                <Icon
                                    name="arrow"
                                    size={17}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="panel quick-panel">
                <h2>Accesos rápidos</h2>

                <div>
                    {accesos.map((acceso) => (
                        <button
                            key={acceso[1]}
                            onClick={() =>
                                setAccion(acceso[1])
                            }
                        >
                            <span>
                                <Icon name={acceso[0]} />
                            </span>

                            {acceso[1]}
                        </button>
                    ))}
                </div>
            </div>

            {pacienteSeleccionado && (
                <div className="panel">
                    <div className="panel-head">
                        <div>
                            <h2>Ficha del paciente</h2>
                            <p>{pacienteSeleccionado}</p>
                        </div>

                        <button
                            className="small-outline"
                            onClick={() =>
                                setPacienteSeleccionado(null)
                            }
                        >
                            Cerrar
                        </button>
                    </div>

                    <p className="px-6 mb-4">
                        Información simulada del paciente para la
                        demostración del sistema.
                    </p>
                </div>
            )}

            {accion && (
                <div className="panel">
                    <div className="panel-head">
                        <div>
                            <h2>{accion}</h2>
                            <p>
                                Funcionalidad simulada del panel del
                                nutricionista.
                            </p>
                        </div>

                        <button
                            className="small-outline"
                            onClick={() => setAccion("")}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}