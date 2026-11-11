"use client";

import { useState } from "react";

import DashboardLayout from "../components/templates/DashboardLayout";
import PageTitle from "../components/molecules/PageTitle";
import Button from "../components/atoms/Button";
import Icon from "../components/atoms/Icon";

const days = [
    { short: "Lun", number: "23", title: "Lunes, 23 de junio" },
    { short: "Mar", number: "24", title: "Martes, 24 de junio" },
    { short: "Mié", number: "25", title: "Miércoles, 25 de junio" },
    { short: "Jue", number: "26", title: "Jueves, 26 de junio" },
    { short: "Vie", number: "27", title: "Viernes, 27 de junio" },
    { short: "Sáb", number: "28", title: "Sábado, 28 de junio" },
    { short: "Dom", number: "29", title: "Domingo, 29 de junio" },
];

const meals = [
    { id: 1, hora: "08:00", tipo: "Desayuno", titulo: "Avena cremosa con fruta", ingredientes: "Avena, leche, plátano, semillas de chía" },
    { id: 2, hora: "11:00", tipo: "Colación", titulo: "Yogur y frutos secos", ingredientes: "Yogur natural, nueces, arándanos" },
    { id: 3, hora: "14:00", tipo: "Almuerzo", titulo: "Bowl mediterráneo", ingredientes: "Quinoa, pollo, vegetales, palta" },
    { id: 4, hora: "17:30", tipo: "Colación", titulo: "Tostada integral", ingredientes: "Pan integral, quesillo, tomate" },
    { id: 5, hora: "21:00", tipo: "Cena", titulo: "Crema de zapallo y huevo", ingredientes: "Zapallo, zanahoria, huevo, semillas" },
];

const VASOS_META = 8;

export default function PlanPage() {
    const [selectedDay, setSelectedDay] = useState(1);
    const [vasos, setVasos] = useState(6);

    const porcentaje = Math.min(100, Math.round((vasos / VASOS_META) * 100));
    const faltantes = VASOS_META - vasos;

    function sumarVaso() {
        setVasos((v) => Math.min(VASOS_META, v + 1));
    }

    function restarVaso() {
        setVasos((v) => Math.max(0, v - 1));
    }

    return (
        <DashboardLayout>
            <PageTitle
                title="Mi plan alimenticio"
                subtitle="Tu guía diaria, creada especialmente para ti."
                action={
                    <Button variant="outline" disabled title="Próximamente">
                        <Icon name="file" size={17} />
                        Descargar PDF
                    </Button>
                }
            />

            <div className="plan-banner">
                <div>
                    <span className="status green">PLAN ACTIVO</span>
                    <h2>Plan Equilibrio · Semana 4</h2>
                    <p>Creado por Camila Muñoz · Actualizado el 18 de junio</p>
                </div>

                <div className="plan-note">
                    <Icon name="heart" />
                    <span>
                        <b>Objetivo actual</b>
                        Mejorar composición corporal y energía
                    </span>
                </div>
            </div>

            <div className="day-tabs">
                {days.map((day, index) => (
                    <button
                        key={day.number}
                        className={selectedDay === index ? "active" : ""}
                        onClick={() => setSelectedDay(index)}
                    >
                        <span>{day.short}</span>
                        <b>{day.number}</b>
                    </button>
                ))}
            </div>

            <div className="meal-layout">
                <div className="panel meals">
                    <div className="panel-head">
                        <div>
                            <h2>{days[selectedDay].title}</h2>
                            <p>Plan diario · Aproximadamente 1.850 kcal</p>
                        </div>
                    </div>

                    {meals.map((meal, index) => (
                        <div className="meal" key={meal.id}>
                            <div className="meal-time">
                                <span>{meal.hora}</span>
                                <i className={`meal-dot dot-${index}`} />
                            </div>

                            <div>
                                <small>{meal.tipo}</small>
                                <h3>{meal.titulo}</h3>
                                <p>{meal.ingredientes}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <aside>
                    <div className="panel hydration">
                        <span className="water-drop">◌</span>

                        <h3>Hidratación</h3>

                        <b>
                            {vasos} de {VASOS_META} vasos
                        </b>

                        <div>
                            <i style={{ width: `${porcentaje}%` }} />
                        </div>

                        <p>
                            {vasos >= VASOS_META
                                ? "¡Meta cumplida! Excelente."
                                : `¡Vas muy bien! Te faltan ${faltantes} ${
                                    faltantes === 1 ? "vaso" : "vasos"
                                }.`}
                        </p>

                        <span style={{ display: "flex", gap: 8, marginTop: 12 }}>
                            <button
                                type="button"
                                className="small-outline"
                                onClick={restarVaso}
                                disabled={vasos === 0}
                                aria-label="Quitar un vaso"
                            >
                                −
                            </button>
                            <button
                                type="button"
                                className="small-outline"
                                onClick={sumarVaso}
                                disabled={vasos === VASOS_META}
                                aria-label="Agregar un vaso"
                            >
                                +
                            </button>
                        </span>
                    </div>

                    <div className="panel tip">
                        <Icon name="leaf" />
                        <h3>Consejo del día</h3>
                        <p>
                            Come con calma y sin pantallas. Reconocer tus señales de
                            saciedad también es parte del plan.
                        </p>
                        <span>— Camila, tu nutricionista</span>
                    </div>
                </aside>
            </div>
        </DashboardLayout>
    );
}