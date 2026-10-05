"use client";

import { useState } from "react";

import DashboardLayout from "../components/templates/DashboardLayout";
import PageTitle from "../components/molecules/PageTitle";
import Button from "../components/atoms/Button";
import Icon from "../components/atoms/Icon";

export default function PlanPage() {
    const days = [
        {
            short: "Lun",
            number: "23",
            title: "Lunes, 23 de junio",
        },
        {
            short: "Mar",
            number: "24",
            title: "Martes, 24 de junio",
        },
        {
            short: "Mié",
            number: "25",
            title: "Miércoles, 25 de junio",
        },
        {
            short: "Jue",
            number: "26",
            title: "Jueves, 26 de junio",
        },
        {
            short: "Vie",
            number: "27",
            title: "Viernes, 27 de junio",
        },
        {
            short: "Sáb",
            number: "28",
            title: "Sábado, 28 de junio",
        },
        {
            short: "Dom",
            number: "29",
            title: "Domingo, 29 de junio",
        },
    ];

    const [selectedDay, setSelectedDay] = useState(1);

    const meals = [
        [
            "08:00",
            "Desayuno",
            "Avena cremosa con fruta",
            "Avena, leche, plátano, semillas de chía",
        ],
        [
            "11:00",
            "Colación",
            "Yogur y frutos secos",
            "Yogur natural, nueces, arándanos",
        ],
        [
            "14:00",
            "Almuerzo",
            "Bowl mediterráneo",
            "Quinoa, pollo, vegetales, palta",
        ],
        [
            "17:30",
            "Colación",
            "Tostada integral",
            "Pan integral, quesillo, tomate",
        ],
        [
            "21:00",
            "Cena",
            "Crema de zapallo y huevo",
            "Zapallo, zanahoria, huevo, semillas",
        ],
    ];

    return (
        <DashboardLayout>
            <PageTitle
                title="Mi plan alimenticio"
                subtitle="Tu guía diaria, creada especialmente para ti."
                action={
                    <Button variant="outline">
                        <Icon name="file" size={17} />
                        Descargar PDF
                    </Button>
                }
            />

            <div className="plan-banner">
                <div>
                    <span className="status green">
                        PLAN ACTIVO
                    </span>

                    <h2>Plan Equilibrio · Semana 4</h2>

                    <p>
                        Creado por Camila Muñoz · Actualizado el 18 de junio
                    </p>
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
                        className={
                            selectedDay === index
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setSelectedDay(index)
                        }
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
                            <h2>
                                {days[selectedDay].title}
                            </h2>

                            <p>
                                Plan diario · Aproximadamente 1.850 kcal
                            </p>
                        </div>
                    </div>

                    {meals.map((meal, index) => (
                        <div
                            className="meal"
                            key={`${meal[0]}-${meal[1]}`}
                        >
                            <div className="meal-time">
                                <span>{meal[0]}</span>

                                <i
                                    className={`meal-dot dot-${index}`}
                                />
                            </div>

                            <div>
                                <small>{meal[1]}</small>

                                <h3>{meal[2]}</h3>

                                <p>{meal[3]}</p>
                            </div>

                            <button>
                                <Icon
                                    name="arrow"
                                    size={18}
                                />
                            </button>
                        </div>
                    ))}
                </div>

                <aside>
                    <div className="panel hydration">
                        <span className="water-drop">
                            ◌
                        </span>

                        <h3>Hidratación</h3>

                        <b>6 de 8 vasos</b>

                        <div>
                            <i
                                style={{
                                    width: "75%",
                                }}
                            />
                        </div>

                        <p>
                            ¡Vas muy bien! Te faltan 2 vasos.
                        </p>
                    </div>

                    <div className="panel tip">
                        <Icon name="leaf" />

                        <h3>Consejo del día</h3>

                        <p>
                            Come con calma y sin pantallas.
                            Reconocer tus señales de saciedad
                            también es parte del plan.
                        </p>

                        <span>
                            — Camila, tu nutricionista
                        </span>
                    </div>
                </aside>
            </div>
        </DashboardLayout>
    );
}