"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "../components/atoms/Button";
import Icon from "../components/atoms/Icon";
import { services } from "../data/services";

const profesionales = [
    ["CM", "Camila Muñoz", "Nutrición clínica y digestiva", "4,9"],
    ["PS", "Paula San Martín", "Nutrición deportiva", "4,8"],
    ["AV", "Antonia Vera", "Conducta alimentaria", "4,9"],
];

const fechas = [
    "24 de junio",
    "25 de junio",
    "26 de junio",
];

const horas = [
    "09:00",
    "10:30",
    "12:00",
    "15:30",
];

function getServiceIcon(type) {
    if (type === "Consulta") {
        return "heart";
    }

    if (type === "Plan especializado") {
        return "leaf";
    }

    if (type === "Evaluación") {
        return "chart";
    }

    return "users";
}

function formatPrice(price) {
    return `$${price.toLocaleString("es-CL")}`;
}

export default function AgendarPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const codigoServicio = searchParams.get("servicio");

    const servicioInicial =
        services.find((item) => item.code === codigoServicio) || null;

    const [step, setStep] = useState(servicioInicial ? 2 : 1);
    const [servicio, setServicio] = useState(servicioInicial);
    const [profesional, setProfesional] = useState(null);
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");

    function continuar() {
        if (step === 1) {
            setStep(2);
            return;
        }

        if (step === 2) {
            setStep(3);
            return;
        }

        if (step === 3) {
            setStep(4);
            return;
        }

        if (step === 4) {
            router.push("/registro");
        }
    }

    return (
        <main className="soft-page">
            <div className="container booking-shell">
                <button
                    className="back-link"
                    onClick={() => router.push("/")}
                >
                    ← Volver al inicio
                </button>

                <div className="booking-heading">
                    <div>
                        <div className="eyebrow">
                            Agenda online
                        </div>

                        <h1>Reserva tu próxima cita</h1>

                        <p>
                            Elige la alternativa que mejor funcione para ti.
                        </p>
                    </div>

                    <span>Paso {step} de 4</span>
                </div>

                <div className="stepper">
                    {[
                        "Servicio",
                        "Profesional",
                        "Fecha y hora",
                        "Confirmación",
                    ].map((item, index) => (
                        <div
                            className={
                                index + 1 <= step
                                    ? "done"
                                    : ""
                            }
                            key={item}
                        >
                            <span>
                                {index + 1 < step ? (
                                    <Icon
                                        name="check"
                                        size={15}
                                    />
                                ) : (
                                    index + 1
                                )}
                            </span>

                            <b>{item}</b>
                        </div>
                    ))}
                </div>

                <div className="booking-card">
                    <div className="booking-main">

                        {step === 1 && (
                            <>
                                <h2>¿Qué necesitas?</h2>

                                <p>
                                    Selecciona el servicio que quieres reservar.
                                </p>

                                <div className="pro-options">
                                    {services.map((item) => (
                                        <button
                                            key={item.code}
                                            className={
                                                servicio?.code === item.code
                                                    ? "pro-option selected"
                                                    : "pro-option"
                                            }
                                            onClick={() =>
                                                setServicio(item)
                                            }
                                        >
                                            <span className="pro-avatar">
                                                <Icon
                                                    name={getServiceIcon(item.type)}
                                                    size={20}
                                                />
                                            </span>

                                            <span>
                                                <b>{item.name}</b>

                                                <small>
                                                    {item.duration} · {item.mode}
                                                </small>

                                                <small>
                                                    {formatPrice(item.price)}
                                                </small>
                                            </span>

                                            <i>
                                                {servicio?.code === item.code && (
                                                    <Icon
                                                        name="check"
                                                        size={16}
                                                    />
                                                )}
                                            </i>
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <h2>
                                    Elige a tu nutricionista
                                </h2>

                                <p>
                                    Selecciona una opción para ver su disponibilidad.
                                </p>

                                <div className="pro-options">
                                    {profesionales.map((item) => (
                                        <button
                                            key={item[1]}
                                            className={
                                                profesional?.[1] === item[1]
                                                    ? "pro-option selected"
                                                    : "pro-option"
                                            }
                                            onClick={() =>
                                                setProfesional(item)
                                            }
                                        >
                                            <span className="pro-avatar">
                                                {item[0]}
                                            </span>

                                            <span>
                                                <b>{item[1]}</b>

                                                <small>
                                                    {item[2]}
                                                </small>

                                                <small className="rating">
                                                    ★ {item[3]} · Próxima hora: 24 jun.
                                                </small>
                                            </span>

                                            <i>
                                                {profesional?.[1] === item[1] && (
                                                    <Icon
                                                        name="check"
                                                        size={16}
                                                    />
                                                )}
                                            </i>
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <h2>
                                    Elige fecha y hora
                                </h2>

                                <p>
                                    Selecciona cuándo quieres realizar tu cita.
                                </p>

                                <div className="pro-options">
                                    {fechas.map((item) => (
                                        <button
                                            key={item}
                                            className={
                                                fecha === item
                                                    ? "pro-option selected"
                                                    : "pro-option"
                                            }
                                            onClick={() =>
                                                setFecha(item)
                                            }
                                        >
                                            <span className="pro-avatar">
                                                <Icon
                                                    name="calendar"
                                                    size={20}
                                                />
                                            </span>

                                            <span>
                                                <b>{item}</b>
                                            </span>

                                            <i>
                                                {fecha === item && (
                                                    <Icon
                                                        name="check"
                                                        size={16}
                                                    />
                                                )}
                                            </i>
                                        </button>
                                    ))}
                                </div>

                                {fecha && (
                                    <div className="filter-pills">
                                        {horas.map((item) => (
                                            <button
                                                key={item}
                                                className={
                                                    hora === item
                                                        ? "selected"
                                                        : ""
                                                }
                                                onClick={() =>
                                                    setHora(item)
                                                }
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}

                        {step === 4 && (
                            <>
                                <h2>
                                    Confirma tu cita
                                </h2>

                                <p>
                                    Revisa los datos antes de confirmar la reserva.
                                </p>

                                <div className="info-note">
                                    Tu cita quedará registrada al confirmar.
                                </div>
                            </>
                        )}
                    </div>

                    <aside className="booking-summary">
                        <span>Resumen de tu cita</span>

                        {servicio ? (
                            <div className="summary-service">
                                <i>
                                    <Icon
                                        name={getServiceIcon(servicio.type)}
                                    />
                                </i>

                                <div>
                                    <small>Servicio</small>

                                    <b>{servicio.name}</b>

                                    <span>
                                        {servicio.duration} · {servicio.mode}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <p>
                                Selecciona un servicio
                            </p>
                        )}

                        <hr />

                        <div className="summary-row">
                            <span>Profesional</span>

                            <b>
                                {profesional
                                    ? profesional[1]
                                    : "Por seleccionar"}
                            </b>
                        </div>

                        <div className="summary-row">
                            <span>Fecha</span>

                            <b>
                                {fecha || "Por seleccionar"}
                            </b>
                        </div>

                        <div className="summary-row">
                            <span>Hora</span>

                            <b>
                                {hora || "Por seleccionar"}
                            </b>
                        </div>

                        <div className="summary-row">
                            <span>Valor</span>

                            <b>
                                {servicio
                                    ? formatPrice(servicio.price)
                                    : "Por seleccionar"}
                            </b>
                        </div>

                        <div className="info-note">
                            No se realizará ningún cobro al reservar.
                        </div>
                    </aside>
                </div>

                <div className="booking-footer gap-4">
                    <Button
                        variant="outline"
                        onClick={() => {
                            if (step === 1) {
                                router.back();
                            } else {
                                setStep(step - 1);
                            }
                        }}
                    >
                        Anterior
                    </Button>

                    <Button onClick={continuar}>
                        {step === 4
                            ? "Confirmar cita"
                            : "Continuar"}

                        <Icon
                            name={
                                step === 4
                                    ? "check"
                                    : "arrow"
                            }
                            size={17}
                        />
                    </Button>
                </div>
            </div>
        </main>
    );
}