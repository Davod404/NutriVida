"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "../components/atoms/Button";
import Icon from "../components/atoms/Icon";
import { services } from "../data/services";
import { crearCita, getNutricionistas } from "../utils/api";
import { getServiceIcon, formatPrice } from "../utils/services";

const getFechasProximas = () => {
    const fechas = [];
    let fecha = new Date();
    
    // Horas fijas para validar
    const todasLasHoras = ["10:00", "11:30", "13:00", "16:30"];

    while (fechas.length < 5) {
        if (fecha.getDay() !== 0 && fecha.getDay() !== 6) {
            const fechaStr = fecha.toLocaleDateString("es-CL", { day: "numeric", month: "long" });
            const diaStr = fecha.getDate().toString();
            
            // Si es hoy, verificar si aún quedan horas futuras
            if (diaStr === new Date().getDate().toString()) {
                const hayHorasFuturas = todasLasHoras.some(horaStr => {
                    const [h, m] = horaStr.split(":").map(Number);
                    const horaCita = new Date();
                    horaCita.setHours(h, m, 0, 0);
                    return horaCita > new Date();
                });
                
                if (!hayHorasFuturas) {
                    fecha.setDate(fecha.getDate() + 1);
                    continue;
                }
            }
            
            fechas.push(fechaStr);
        }
        fecha.setDate(fecha.getDate() + 1);
    }
    return fechas;
};

const fechas = getFechasProximas();

export default function AgendarPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const codigoServicio = searchParams.get("servicio");
    const servicioInicial = services.find((item) => item.code === codigoServicio) || null;

    const [step, setStep] = useState(servicioInicial ? 2 : 1);
    const [servicio, setServicio] = useState(servicioInicial);
    const [profesional, setProfesional] = useState(null);
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [error, setError] = useState("");
    
    const [profesionales, setProfesionales] = useState([]);

    const horasDisponibles = () => {
        const todasLasHoras = ["10:00", "11:30", "13:00", "16:30"];
        if (!fecha) return todasLasHoras;

        const hoy = new Date();
        const fechaSeleccionadaStr = fecha.split(" ")[0];
        const diaActual = hoy.getDate().toString();

        if (fechaSeleccionadaStr === diaActual) {
            return todasLasHoras.filter(horaStr => {
                const [horas, minutos] = horaStr.split(":").map(Number);
                const horaCita = new Date();
                horaCita.setHours(horas, minutos, 0, 0);
                return horaCita > hoy;
            });
        }
        return todasLasHoras;
    };

    useEffect(() => {
        getNutricionistas().then(data => setProfesionales(data)).catch(console.error);

        const pendiente = JSON.parse(localStorage.getItem("citaPendiente"));
        if (pendiente && pendiente.servicio) {
            setServicio(pendiente.servicio);
            setProfesional(pendiente.profesional);
            setFecha(pendiente.fecha);
            setHora(pendiente.hora);
            setStep(4);
            localStorage.removeItem("citaPendiente");
        }
    }, []);

    function continuar() {
        setError("");
        if (step === 1) {
            if (!servicio) return setError("Selecciona un servicio.");
            setStep(2);
            return;
        }
        if (step === 2) {
            if (!profesional) return setError("Selecciona un profesional.");
            setStep(3);
            return;
        }
        if (step === 3) {
            if (!fecha || !hora) return setError("Selecciona fecha y hora.");
            setStep(4);
            return;
        }
        if (step === 4) {
            confirmarCita();
        }
    }

    async function confirmarCita() {
        const sesion = localStorage.getItem("usuarioActivo");
        if (!sesion) {
            localStorage.setItem("citaPendiente", JSON.stringify({ servicio, profesional, fecha, hora }));
            router.push("/login?redirect=/agendar");
            return;
        }

        const profesionalId = profesional.id; 
        
        const ahora = new Date();
        const mesActual = (ahora.getMonth() + 1).toString().padStart(2, '0');
        const anioActual = ahora.getFullYear();
        const dia = fecha.split(" ")[0].padStart(2, "0");
        const fechaHoraISO = `${anioActual}-${mesActual}-${dia}T${hora}:00`;

        try {
            await crearCita({
                servicioCodigo: servicio.code,
                nutricionistaId: profesionalId,
                fechaHora: fechaHoraISO,
                motivo: servicio.name
            });
            router.push("/citas");
        } catch (err) {
            setError("Error al agendar la cita. Intenta de nuevo.");
        }
    }

    function retroceder() {
        setError("");
        if (step === 1) {
            router.push("/servicios");
        } else {
            setStep(step - 1);
        }
    }

    return (
        <main className="soft-page">
            <div className="container booking-shell">
                <button className="back-link" onClick={() => router.push("/")}>
                    ← Volver al inicio
                </button>

                <div className="booking-heading">
                    <div>
                        <div className="eyebrow">Agenda online</div>
                        <h1>Reserva tu próxima cita</h1>
                        <p>Elige la alternativa que mejor funcione para ti.</p>
                    </div>
                    <span>Paso {step} de 4</span>
                </div>

                <div className="stepper">
                    {["Servicio", "Profesional", "Fecha y hora", "Confirmación"].map((item, index) => (
                        <div className={index + 1 <= step ? "done" : ""} key={item}>
                            <span>{index + 1 < step ? <Icon name="check" size={15} /> : index + 1}</span>
                            <b>{item}</b>
                        </div>
                    ))}
                </div>

                <div className="booking-card">
                    <div className="booking-main">
                        {step === 1 && (
                            <>
                                <h2>¿Qué necesitas?</h2>
                                <p>Selecciona el servicio que quieres reservar.</p>
                                <div className="pro-options">
                                    {services.map((item) => (
                                        <button
                                            key={item.code}
                                            className={servicio?.code === item.code ? "pro-option selected" : "pro-option"}
                                            onClick={() => setServicio(item)}
                                        >
                                            <span className="pro-avatar">
                                                <Icon name={getServiceIcon(item.type)} size={20} />
                                            </span>
                                            <span>
                                                <b>{item.name}</b>
                                                <small>{item.duration} · {item.mode}</small>
                                                <small>{formatPrice(item.price)}</small>
                                            </span>
                                            <i>{servicio?.code === item.code && <Icon name="check" size={16} />}</i>
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <h2>Elige a tu nutricionista</h2>
                                <p>Selecciona una opción para ver su disponibilidad.</p>
                                <div className="pro-options">
                                    {profesionales.map((item) => (
                                        <button
                                            key={item.id}
                                            className={profesional?.id === item.id ? "pro-option selected" : "pro-option"}
                                            onClick={() => setProfesional(item)}
                                        >
                                            <span className="pro-avatar">{item.nombre[0]}{item.apellido[0]}</span>
                                            <span>
                                                <b>{item.nombre} {item.apellido}</b>
                                                <small>Nutricionista</small>
                                                <small className="rating">★ 4,9 · Próxima hora: 24 jun.</small>
                                            </span>
                                            <i>{profesional?.id === item.id && <Icon name="check" size={16} />}</i>
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <h2>Elige fecha y hora</h2>
                                <p>Selecciona cuándo quieres realizar tu cita.</p>
                                <div className="pro-options">
                                    {fechas.map((item) => (
                                        <button
                                            key={item}
                                            className={fecha === item ? "pro-option selected" : "pro-option"}
                                            onClick={() => {
                                                setFecha(item);
                                                setHora(""); // Limpiar hora si cambia la fecha
                                            }}
                                        >
                                            <span className="pro-avatar"><Icon name="calendar" size={20} /></span>
                                            <span><b>{item}</b></span>
                                            <i>{fecha === item && <Icon name="check" size={16} />}</i>
                                        </button>
                                    ))}
                                </div>
                                {fecha && (
                                    <div className="filter-pills" style={{ marginTop: 16 }}>
                                        {horasDisponibles().length > 0 ? (
                                            horasDisponibles().map((item) => (
                                                <button
                                                    key={item}
                                                    className={hora === item ? "selected" : ""}
                                                    onClick={() => setHora(item)}
                                                >
                                                    {item}
                                                </button>
                                            ))
                                        ) : (
                                            <p style={{ fontSize: "13px", color: "var(--text)", fontStyle: "italic" }}>
                                                No quedan horas disponibles para este día.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </>
                        )}

                        {step === 4 && (
                            <>
                                <h2>Confirma tu cita</h2>
                                <p>Revisa los datos antes de confirmar la reserva.</p>
                                
                                <div style={{ 
                                    background: 'var(--mint-2)', 
                                    border: '1px solid #dce8e1', 
                                    borderRadius: '12px', 
                                    padding: '20px',
                                    marginTop: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                                        <span style={{ color: 'var(--text)' }}>Servicio</span>
                                        <b style={{ textAlign: 'right' }}>{servicio?.name}</b>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                                        <span style={{ color: 'var(--text)' }}>Profesional</span>
                                        <b>{profesional?.nombre} {profesional?.apellido}</b>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                                        <span style={{ color: 'var(--text)' }}>Fecha y hora</span>
                                        <b>{fecha} a las {hora}</b>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderTop: '1px solid #dce8e1', paddingTop: '12px', marginTop: '4px' }}>
                                        <span style={{ color: 'var(--text)' }}>Total a pagar</span>
                                        <b style={{ color: 'var(--green)', fontSize: '16px' }}>{servicio ? formatPrice(servicio.price) : "—"}</b>
                                    </div>
                                </div>
                                
                                <div className="info-note" style={{ marginTop: '16px' }}>
                                    Al confirmar, recibirás un correo con los detalles de tu cita.
                                </div>
                            </>
                        )}
                    </div>

                    <aside className="booking-summary">
                        <span>Resumen de tu cita</span>
                        {servicio ? (
                            <div className="summary-service">
                                <i><Icon name={getServiceIcon(servicio.type)} /></i>
                                <div>
                                    <small>Servicio</small>
                                    <b>{servicio.name}</b>
                                    <span>{servicio.duration} · {servicio.mode}</span>
                                </div>
                            </div>
                        ) : (
                            <p>Selecciona un servicio</p>
                        )}
                        <hr />
                        <div className="summary-row"><span>Profesional</span><b>{profesional ? `${profesional.nombre} ${profesional.apellido}` : "Por seleccionar"}</b></div>
                        <div className="summary-row"><span>Fecha</span><b>{fecha || "Por seleccionar"}</b></div>
                        <div className="summary-row"><span>Hora</span><b>{hora || "Por seleccionar"}</b></div>
                        <div className="summary-row"><span>Valor</span><b>{servicio ? formatPrice(servicio.price) : "Por seleccionar"}</b></div>
                        <div className="info-note">No se realizará ningún cobro al reservar.</div>
                    </aside>
                </div>

                {error && <p className="form-error" style={{ marginTop: "16px", textAlign: "center" }}>{error}</p>}

                <div className="booking-footer gap-4">
                    <Button variant="outline" onClick={retroceder}>Anterior</Button>
                    <Button onClick={continuar}>
                        {step === 4 ? "Confirmar cita" : "Continuar"}
                        <Icon name={step === 4 ? "check" : "arrow"} size={17} />
                    </Button>
                </div>
            </div>
        </main>
    );
}