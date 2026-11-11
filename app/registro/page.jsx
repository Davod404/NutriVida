"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../utils/api";

import Logo from "../components/atoms/Logo";
import Icon from "../components/atoms/Icon";
import Button from "../components/atoms/Button";
import Field from "../components/molecules/Field";

export default function RegistroPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        password: "",
        confirmarPassword: "",
    });

    const [terminos, setTerminos] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (
            !form.nombre.trim() ||
            !form.apellido.trim() ||
            !form.email.trim() ||
            !form.telefono.trim() ||
            !form.password ||
            !form.confirmarPassword
        ) {
            setError("Completa todos los campos.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setError("Ingresa un correo electrónico válido.");
            return;
        }

        const telefonoLimpio = form.telefono.replace(/[\s+]/g, "");
        if (telefonoLimpio.length < 9 || isNaN(telefonoLimpio)) {
            setError("Ingresa un teléfono válido (mínimo 9 dígitos).");
            return;
        }

        if (form.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (form.password !== form.confirmarPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        if (!terminos) {
            setError("Debes aceptar los términos y condiciones.");
            return;
        }

        try {
            await register({
                nombre: form.nombre.trim(),
                apellido: form.apellido.trim(),
                email: form.email.trim(),
                telefono: form.telefono.trim(),
                password: form.password
            });

            const redirect = new URLSearchParams(window.location.search).get("redirect") || "/citas";
            router.push(redirect);
        } catch (err) {
            setError(err.message || "Error al crear la cuenta. Intenta de nuevo.");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-aside">
                <Logo onClick={() => router.push("/")} />

                <div className="auth-quote">
                    <span className="quote-mark">“</span>

                    <h2>
                        Pequeños cambios,
                        <br />
                        grandes resultados.
                    </h2>

                    <p>
                        Tu salud es un proceso. Nosotros estaremos contigo en cada paso.
                    </p>
                </div>

                <img
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&fit=crop&w=900&h=700&q=85"
                    alt="Alimentación saludable y colorida"
                />

                <small>Nutrición consciente · Bienestar real</small>
            </div>

            <div className="auth-main">
                <div className="auth-box">
                    <div className="mobile-auth-logo">
                        <Logo onClick={() => router.push("/")} />
                    </div>

                    <div className="eyebrow">Únete a NutriVida</div>

                    <h1>Crea tu cuenta</h1>

                    <p>Completa tus datos para comenzar a cuidar de ti.</p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <Field
                                label="Nombre"
                                name="nombre"
                                placeholder="Tu nombre"
                                value={form.nombre}
                                onChange={handleChange}
                            />

                            <Field
                                label="Apellido"
                                name="apellido"
                                placeholder="Tu apellido"
                                value={form.apellido}
                                onChange={handleChange}
                            />

                            <Field
                                label="Correo electrónico"
                                name="email"
                                placeholder="nombre@correo.cl"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                            />

                            <Field
                                label="Teléfono"
                                name="telefono"
                                placeholder="+56 9 0000 0000"
                                value={form.telefono}
                                onChange={handleChange}
                            />

                            <Field
                                label="Contraseña"
                                name="password"
                                placeholder="••••••••"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                            />

                            <Field
                                label="Confirmar contraseña"
                                name="confirmarPassword"
                                placeholder="••••••••"
                                type="password"
                                value={form.confirmarPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <label className="terms">
                            <input
                                type="checkbox"
                                checked={terminos}
                                onChange={(e) => setTerminos(e.target.checked)}
                            />
                            Acepto los términos de servicio y la política de privacidad.
                        </label>

                        {error && <p className="form-error">{error}</p>}

                        <Button type="submit" className="auth-submit">
                            Crear mi cuenta
                            <Icon name="arrow" size={18} />
                        </Button>
                    </form>

                    <div className="auth-switch">
                        ¿Ya tienes una cuenta?{" "}
                        <button onClick={() => router.push("/login")}>
                            Inicia sesión
                        </button>
                    </div>

                    <div style={{ marginTop: "24px", textAlign: "center" }}>
                        <button
                            type="button"
                            onClick={() => router.push("/")}
                            style={{
                                background: "none",
                                border: "none",
                                color: "var(--green)",
                                fontSize: "12px",
                                fontWeight: "600",
                                cursor: "pointer",
                                textDecoration: "underline"
                            }}
                        >
                            ← Volver al inicio
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}