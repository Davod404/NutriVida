"use client";

import { useState } from "react";

import DashboardLayout from "../components/templates/DashboardLayout";
import PageTitle from "../components/molecules/PageTitle";
import Metric from "../components/molecules/Metric";
import Button from "../components/atoms/Button";

export default function ProgresoPage() {
    const [periodo, setPeriodo] = useState("6");

    const bars = [72, 68, 63, 60, 55, 51];
    const values = [72.5, 71.8, 70.9, 69.8, 69.1, 68.2];
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];

    const measurements = [
        ["18 Jun 2025", "68,2 kg", "168 cm", "78 cm", "24,1", "−0,9 kg"],
        ["21 May 2025", "69,1 kg", "168 cm", "80 cm", "24,5", "−0,7 kg"],
        ["23 Abr 2025", "69,8 kg", "168 cm", "81 cm", "24,7", "−1,1 kg"],
        ["19 Mar 2025", "70,9 kg", "168 cm", "83 cm", "25,1", "−0,9 kg"],
    ];

    const cantidad = Number(periodo);

    const visibleBars = bars.slice(-cantidad);
    const visibleValues = values.slice(-cantidad);
    const visibleMonths = months.slice(-cantidad);

    function descargarInforme() {
        const contenido = `
INFORME DE PROGRESO - NUTRIVIDA

Peso actual: 68,2 kg
Cambio desde enero: -4,3 kg

Circunferencia cintura: 78 cm
Cambio desde enero: -6 cm

IMC actual: 24,1
Estado: Rango saludable

Meta:
Peso inicial: 72,5 kg
Peso objetivo: 66 kg
Progreso: 68%

HISTORIAL DE MEDICIONES

${measurements
    .map(
        (row) =>
            `${row[0]} | ${row[1]} | ${row[2]} | ${row[3]} | ${row[4]} | ${row[5]}`
    )
    .join("\n")}
`;

        const archivo = new Blob([contenido], {
            type: "text/plain",
        });

        const url = URL.createObjectURL(archivo);

        const enlace = document.createElement("a");

        enlace.href = url;
        enlace.download = "informe-progreso-nutrivida.txt";

        enlace.click();

        URL.revokeObjectURL(url);
    }

    return (
        <DashboardLayout>
            <PageTitle
                title="Mi progreso"
                subtitle="Cada pequeño avance cuenta. Aquí puedes ver tu evolución."
            />

            <div className="metric-grid progress-metrics">
                <Metric
                    icon="chart"
                    label="Peso actual"
                    value="68,2 kg"
                    detail="↓ 4,3 kg desde enero"
                />

                <Metric
                    icon="heart"
                    label="Circ. cintura"
                    value="78 cm"
                    detail="↓ 6 cm desde enero"
                />

                <Metric
                    icon="user"
                    label="IMC actual"
                    value="24,1"
                    detail="Rango saludable"
                />
            </div>

            <div className="progress-grid">
                <div className="panel chart-panel">
                    <div className="panel-head">
                        <div>
                            <h2>Evolución de peso</h2>

                            <p>
                                Últimos {periodo} meses
                            </p>
                        </div>

                        <select
                            value={periodo}
                            onChange={(e) =>
                                setPeriodo(e.target.value)
                            }
                        >
                            <option value="6">
                                6 meses
                            </option>

                            <option value="3">
                                3 meses
                            </option>
                        </select>
                    </div>

                    <div className="chart-area">
                        <div className="y-labels">
                            <span>76 kg</span>
                            <span>72 kg</span>
                            <span>68 kg</span>
                            <span>64 kg</span>
                        </div>

                        <div className="bar-chart">
                            {visibleBars.map((bar, index) => (
                                <div
                                    className="bar-col"
                                    key={visibleMonths[index]}
                                >
                                    <span className="bar-value">
                                        {visibleValues[index]}
                                    </span>

                                    <div
                                        style={{
                                            height: `${bar}%`,
                                        }}
                                        className={
                                            index ===
                                            visibleBars.length - 1
                                                ? "bar current"
                                                : "bar"
                                        }
                                    />

                                    <small>
                                        {visibleMonths[index]}
                                    </small>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="panel goal-panel">
                    <span className="status green">
                        EN CAMINO
                    </span>

                    <h2>Tu meta</h2>

                    <div className="goal-ring">
                        <span>
                            <b>68%</b>
                            <small>completado</small>
                        </span>
                    </div>

                    <div className="goal-row">
                        <span>
                            Inicio <b>72,5 kg</b>
                        </span>

                        <span>
                            Meta <b>66 kg</b>
                        </span>
                    </div>

                    <p>
                        Te faltan <b>2,2 kg</b> para alcanzar tu meta.
                    </p>
                </div>
            </div>

            <div className="panel measurement-panel">
                <div className="panel-head">
                    <div>
                        <h2>Historial de mediciones</h2>

                        <p>
                            Registros realizados por tu nutricionista
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        onClick={descargarInforme}
                    >
                        Descargar informe
                    </Button>
                </div>

                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Peso</th>
                                <th>Talla</th>
                                <th>Cintura</th>
                                <th>IMC</th>
                                <th>Variación</th>
                            </tr>
                        </thead>

                        <tbody>
                            {measurements.map((row) => (
                                <tr key={row[0]}>
                                    {row.map((cell, index) => (
                                        <td
                                            key={`${row[0]}-${index}`}
                                            className={
                                                index === 5
                                                    ? "positive"
                                                    : ""
                                            }
                                        >
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}