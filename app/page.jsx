"use client";

import { useRouter } from "next/navigation";

import PublicLayout from "./components/templates/PublicLayout";
import Button from "./components/atoms/Button";
import Icon from "./components/atoms/Icon";
import ServiceCard from "./components/molecules/ServiceCard";

const services = [
    {
        code: "NV-01",
        type: "Consulta",
        name: "Evaluación nutricional integral",
        duration: "60 min",
        mode: "Presencial",
        pro: "Nutricionista clínico",
        price: "$38.000",
        text: "Conoce tu estado nutricional y recibe una estrategia personalizada según tus objetivos.",
        icon: "heart",
    },
    {
        code: "NV-02",
        type: "Plan",
        name: "Plan Equilibrio",
        duration: "8 semanas",
        mode: "Híbrida",
        pro: "Equipo NutriVida",
        price: "$98.000",
        text: "Acompañamiento completo con controles, plan alimenticio y seguimiento de progreso.",
        icon: "leaf",
    },
    {
        code: "NV-03",
        type: "Consulta",
        name: "Nutrición deportiva",
        duration: "50 min",
        mode: "Presencial / Online",
        pro: "Especialista deportivo",
        price: "$42.000",
        text: "Optimiza tu rendimiento y recuperación con un plan adaptado a tu disciplina.",
        icon: "chart",
    },
];

export default function Home() {
    const router = useRouter();

    return (
        <PublicLayout>
            <section className="hero">
                <div className="hero-blob hero-blob-one" />
                <div className="hero-blob hero-blob-two" />

                <div className="container hero-grid">
                    <div className="hero-copy">
                        <div className="eyebrow">
                            <span>
                                <Icon name="leaf" size={14} />
                            </span>
                            Nutrición cercana en Temuco
                        </div>

                        <h1>
                            Tu bienestar comienza con una alimentación que se adapta a{" "}
                            <em>tu vida.</em>
                        </h1>

                        <p>
                            Te acompañamos a construir hábitos saludables y sostenibles, con
                            atención profesional, humana y personalizada.
                        </p>

                        <div className="hero-actions">
                            <Button 
                                variant="primary"
                                onClick={() => router.push("/agendar")}>
                                Agendar mi primera cita
                                <Icon name="arrow" size={18} />
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => router.push("/servicios")}
                            >

                                Conocer nuestros planes
                            </Button>
                        </div>

                        <div className="trust-row">
                            <div className="avatars">
                                <span>CM</span>
                                <span>PS</span>
                                <span>AV</span>
                            </div>

                            <div>
                                <b>+1.200 pacientes</b>
                                <small>nos recomiendan en La Araucanía</small>
                            </div>

                            <div className="stars">
                                ★★★★★ <small>4,9</small>
                            </div>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="hero-image-wrap">
                            <img
                                src="https://images.unsplash.com/photo-1675270690434-aa99f4871e8a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000"
                                alt="Nutricionista en consulta personalizada"
                            />

                            <div className="floating-card card-top">
                                <span className="float-icon">
                                    <Icon name="heart" />
                                </span>

                                <div>
                                    <b>Atención personalizada</b>
                                    <small>Planes pensados para ti</small>
                                </div>
                            </div>

                            <div className="floating-card card-bottom">
                                <span className="float-icon">
                                    <Icon name="calendar" />
                                </span>

                                <div>
                                    <b>Agenda flexible</b>
                                    <small>Presencial y online</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="benefits">
                <div className="container benefits-grid">
                    {[
                        [
                            "heart",
                            "Atención humana",
                            "Te escuchamos y acompañamos sin juicios.",
                        ],
                        [
                            "file",
                            "Planes realistas",
                            "Adaptados a tu rutina y preferencias.",
                        ],
                        [
                            "chart",
                            "Progreso visible",
                            "Sigue tu evolución de forma simple.",
                        ],
                        [
                            "calendar",
                            "Todo en un lugar",
                            "Agenda y revisa tu plan cuando quieras.",
                        ],
                    ].map(([icon, title, text]) => (
                        <div className="benefit" key={title}>
                            <span>
                                <Icon name={icon} />
                            </span>

                            <div>
                                <h3>{title}</h3>
                                <p>{text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section container">
                <div className="section-heading">
                    <div>
                        <div className="eyebrow">Servicios destacados</div>

                        <h2>Un plan para cada etapa de tu vida</h2>

                        <p>
                            Elige cómo quieres comenzar. Nosotros te ayudamos a avanzar.
                        </p>
                    </div>

                    <button
                        className="text-link"
                        onClick={() => router.push("/servicios")}
                    >
                        Ver todos los servicios
                        <Icon name="arrow" size={17} />
                    </button>
                </div>

                <div className="service-grid">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.code}
                            code={service.code}
                            type={service.type}
                            title={service.name}
                            description={service.text}
                            duration={service.duration}
                            modality={service.mode}
                            price={service.price}
                            icon={service.icon}
                            featured={index === 1}
                            popular={index === 1}
                            onBook={() => router.push(`/agendar?servicio=${service.code}`)}
                        />
                    ))}
                </div>
            </section>

            <section className="team-section">
                <div className="container">
                    <div className="center-heading">
                        <div className="eyebrow">Nuestro equipo</div>

                        <h2>Profesionales que te acompañan</h2>

                        <p>
                            Un equipo cercano y especializado, comprometido con tu bienestar.
                        </p>
                    </div>

                    <div className="team-grid">
                        {[
                            [
                                "https://images.unsplash.com/photo-1585358682246-23acb1561f6b?crop=faces&fit=crop&w=600&h=600&q=85",
                                "Camila Muñoz",
                                "Nutrición clínica y digestiva",
                            ],
                            [
                                "https://images.unsplash.com/photo-1675270882554-ab6817fb44f3?crop=faces&fit=crop&w=600&h=600&q=85",
                                "Paula San Martín",
                                "Nutrición deportiva",
                            ],
                            [
                                "https://images.unsplash.com/photo-1675270336539-ffbc2d85f5e1?crop=faces&fit=crop&w=600&h=600&q=85",
                                "Antonia Vera",
                                "Conducta alimentaria",
                            ],
                        ].map(([img, name, specialty]) => (
                            <article className="team-card" key={name}>
                                <img src={img} alt={name} />

                                <div>
                                    <h3>{name}</h3>
                                    <p>{specialty}</p>

                                    <button onClick={() => router.push("/agendar")}>
                                        Ver disponibilidad
                                        <Icon name="arrow" size={16} />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container cta">
                <div>
                    <div className="eyebrow light">Da el primer paso</div>

                    <h2>¿Lista para sentirte mejor?</h2>

                    <p>
                        Agenda tu evaluación inicial y comencemos a construir un plan que
                        funcione para ti.
                    </p>
                </div>

                <Button 
                    variant="secondary"
                    onClick={() => router.push("/agendar")}>
                    Agendar evaluación
                    <Icon name="calendar" size={18} />
                </Button>
            </section>
        </PublicLayout>
    );
}