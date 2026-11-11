"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import PublicLayout from "../components/templates/PublicLayout";
import ServiceCard from "../components/molecules/ServiceCard";
import { getServiceIcon, formatPrice } from "../utils/services";
import { getServicios } from "../utils/api";

export default function ServicesPage() {
    const router = useRouter();

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filter, setFilter] = useState("Todos");
    const [order, setOrder] = useState("recomendados");

    useEffect(() => {
        async function cargar() {
            try {
                const data = await getServicios();
                setServices(data);
            } catch (error) {
                console.error("Error cargando servicios", error);
            } finally {
                setLoading(false);
            }
        }
        cargar();
    }, []);

    let filteredServices = services.filter((service) => {
        if (filter === "Todos") return true;
        if (filter === "Consultas") return service.type === "Consulta";
        if (filter === "Planes") return service.type === "Plan especializado";
        if (filter === "Talleres") return service.type === "Taller grupal";
        if (filter === "Online") return service.mode.includes("Online");
        if (filter === "Presencial")
            return service.mode.includes("Presencial") && service.type !== "Taller grupal";

        return true;
    });

    if (order === "menor") {
        filteredServices = [...filteredServices].sort((a, b) => a.price - b.price);
    }

    if (order === "mayor") {
        filteredServices = [...filteredServices].sort((a, b) => b.price - a.price);
    }

    if (loading) {
        return (
            <PublicLayout>
                <div style={{ textAlign: "center", padding: "100px 20px", color: "var(--text)" }}>
                    <p>Cargando servicios...</p>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <main>
                <section className="page-hero">
                    <div className="container">
                        <div className="eyebrow">Servicios y planes</div>

                        <h1>
                            Encuentra el acompañamiento
                            <br />
                            que necesitas
                        </h1>

                        <p>
                            Atención profesional, flexible y enfocada en tus objetivos.
                            Sin dietas imposibles.
                        </p>

                        <div className="filter-pills">
                            {[
                                "Todos",
                                "Consultas",
                                "Planes",
                                "Talleres",
                                "Online",
                                "Presencial",
                            ].map((item) => (
                                <button
                                    key={item}
                                    className={filter === item ? "selected" : ""}
                                    onClick={() => setFilter(item)}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="container catalog">
                    <div className="catalog-top">
                        <div>
                            <b>{filteredServices.length} opciones disponibles</b>
                            <span>Elige la que mejor se adapte a ti</span>
                        </div>

                        <select value={order} onChange={(e) => setOrder(e.target.value)}>
                            <option value="recomendados">Ordenar por: Recomendados</option>
                            <option value="menor">Precio: menor a mayor</option>
                            <option value="mayor">Precio: mayor a menor</option>
                        </select>
                    </div>

                    <div className="service-grid">
                        {filteredServices.map((service) => (
                            <ServiceCard
                                key={service.code}
                                code={service.code}
                                type={service.type}
                                title={service.name}
                                description={service.description}
                                duration={service.duration}
                                modality={service.mode}
                                price={formatPrice(service.price)}
                                icon={getServiceIcon(service.type)}
                                onBook={() =>
                                    router.push(`/agendar?servicio=${service.code}`)
                                }
                            />
                        ))}
                    </div>
                </section>
            </main>
        </PublicLayout>
    );
}