"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login, getMe } from "../utils/api";

import Logo from "../components/atoms/Logo";
import Icon from "../components/atoms/Icon";
import Button from "../components/atoms/Button";
import Field from "../components/molecules/Field";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/citas";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Completa todos los campos.");
            return;
        }

        try {
            await login(email, password);
            const perfil = await getMe();
            
            localStorage.setItem("usuarioActivo", JSON.stringify({
                email: perfil.email,
                rol: perfil.rol,
                nombre: perfil.nombre,
                apellido: perfil.apellido,
                pacienteId: perfil.pacienteId,
                nutricionistaId: perfil.nutricionistaId
            }));

            if (perfil.rol === "Administrador") router.push("/admin");
            else if (perfil.rol === "Nutricionista") router.push("/nutricionista");
            else router.push(redirect);

        } catch (err) {
            setError("Credenciales incorrectas o error de conexión.");
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

                    <div className="eyebrow">Qué bueno verte</div>

                    <h1>Bienvenido de vuelta</h1>

                    <p>Ingresa a tu espacio personal y continúa tu proceso.</p>

                    <form onSubmit={handleLogin}>
                        <div className="form-grid">
                            <Field
                                label="Correo electrónico"
                                placeholder="nombre@correo.cl"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <Field
                                label="Contraseña"
                                placeholder="••••••••"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <label>
                                <input type="checkbox" /> Recordarme
                            </label>

                            <button
                                type="button"
                                onClick={() => alert("Contacta a soporte a hola@nutrivida.cl para recuperar tu contraseña.")}
                            >
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>

                        {error && <p className="form-error">{error}</p>}

                        <Button type="submit" className="auth-submit">
                            Ingresar a mi cuenta
                            <Icon name="arrow" size={18} />
                        </Button>
                    </form>

                    <div className="auth-switch">
                        ¿Aún no tienes una cuenta?{" "}
                        <button onClick={() => router.push("/registro")}>
                            Regístrate gratis
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