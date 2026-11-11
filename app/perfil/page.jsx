"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../components/templates/DashboardLayout";
import PageTitle from "../components/molecules/PageTitle";
import Button from "../components/atoms/Button";
import Icon from "../components/atoms/Icon";

export default function PerfilPage() {
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        fechaNacimiento: "",
        objetivoNutricional: ""
    });
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

    useEffect(() => {
        async function cargarPerfil() {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:8080/api/pacientes/me", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (!res.ok) throw new Error("Error al cargar perfil");
                
                const data = await res.json();
                setForm({
                    nombre: data.nombre || "",
                    apellido: data.apellido || "",
                    telefono: data.telefono || "",
                    fechaNacimiento: data.fechaNacimiento || "",
                    objetivoNutricional: data.objetivoNutricional || ""
                });
                setEmail(data.email || "");
            } catch (error) {
                setMensaje({ tipo: "error", texto: "Error al cargar los datos del perfil." });
            } finally {
                setLoading(false);
            }
        }
        cargarPerfil();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGuardando(true);
        setMensaje({ tipo: "", texto: "" });

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:8080/api/pacientes/me", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            if (!res.ok) throw new Error("Error al guardar");
            
            setMensaje({ tipo: "exito", texto: "Datos actualizados correctamente." });
            
            const sesion = JSON.parse(localStorage.getItem("usuarioActivo"));
            sesion.nombre = form.nombre;
            sesion.apellido = form.apellido;
            localStorage.setItem("usuarioActivo", JSON.stringify(sesion));

        } catch (error) {
            setMensaje({ tipo: "error", texto: "Error al guardar los cambios. Intenta de nuevo." });
        } finally {
            setGuardando(false);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div style={{ padding: "50px", textAlign: "center" }}>Cargando perfil...</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <PageTitle
                title="Mi perfil"
                subtitle="Administra tu información personal y objetivos."
            />

            <div className="panel" style={{ maxWidth: "800px", margin: "0 auto" }}>
                <div className="panel-head">
                    <div>
                        <h2>Datos personales</h2>
                        <p>Esta información será visible para tu nutricionista.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={{ padding: "24px" }}>
                    <div className="form-grid">
                        <div className="field">
                            <span>Correo electrónico (No editable)</span>
                            <input 
                                type="email" 
                                value={email} 
                                disabled 
                                style={{ backgroundColor: "#f3f5f4", cursor: "not-allowed" }} 
                            />
                        </div>

                        <div className="field">
                            <span>Teléfono</span>
                            <input
                                name="telefono"
                                value={form.telefono}
                                onChange={handleChange}
                                placeholder="+56 9 0000 0000"
                            />
                        </div>

                        <div className="field">
                            <span>Nombre</span>
                            <input
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="field">
                            <span>Apellido</span>
                            <input
                                name="apellido"
                                value={form.apellido}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="field">
                            <span>Fecha de Nacimiento</span>
                            <input
                                type="date"
                                name="fechaNacimiento"
                                value={form.fechaNacimiento}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="field" style={{ gridColumn: "1 / -1" }}>
                            <span>Objetivo Nutricional</span>
                            <textarea
                                name="objetivoNutricional"
                                value={form.objetivoNutricional}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Ej: Bajar de peso, ganar masa muscular..."
                                style={{
                                    width: "100%",
                                    padding: "12px 14px",
                                    border: "1px solid #d5e1da",
                                    borderRadius: "9px",
                                    fontFamily: "inherit",
                                    fontSize: "14px",
                                    resize: "vertical"
                                }}
                            />
                        </div>
                    </div>

                    {mensaje.texto && (
                        <div style={{ 
                            marginTop: "16px", 
                            padding: "10px", 
                            borderRadius: "8px",
                            fontSize: "13px",
                            backgroundColor: mensaje.tipo === "exito" ? "#e5f4e9" : "#fff0f0",
                            color: mensaje.tipo === "exito" ? "#27724e" : "#a15252"
                        }}>
                            {mensaje.texto}
                        </div>
                    )}

                    <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
                        <Button type="submit" disabled={guardando}>
                            {guardando ? "Guardando..." : "Guardar cambios"}
                            <Icon name="check" size={18} />
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}