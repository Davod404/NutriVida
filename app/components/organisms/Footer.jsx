import Link from "next/link";
import Icon from "../atoms/Icon";

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div>
                        <span className="logo-icon p-4 gap-4">
                            <Icon name="leaf" size={20} />
                            <p>
                                Nutri<span className="vida">Vida</span>
                            </p>
                        </span>

                        <p>
                            Nutrición cercana y personalizada para vivir con más bienestar.
                        </p>

                        <span>Av. Alemania 0671, Temuco, Chile</span>
                    </div>

                    <div>
                        <b>Explora</b>

                        <Link href="/servicios">Servicios y planes</Link>

                        <span className="text-muted">Especialistas</span>
                        <span className="text-muted">Nosotros</span>
                    </div>

                    <div>
                        <b>Tu cuenta</b>

                        <Link href="/login">Iniciar sesión</Link>
                        <Link href="/registro">Crear cuenta</Link>
                        <Link href="/agendar">Agendar cita</Link>
                    </div>

                    <div>
                        <b>Contacto</b>

                        <a href="tel:+56987654321">+56 9 8765 4321</a>
                        <a href="mailto:hola@nutrivida.cl">hola@nutrivida.cl</a>
                        <span>Lun a Vie · 09:00–19:00</span>
                    </div>
                </div>

                <div className="copyright">
                    <span>© {new Date().getFullYear()} NutriVida</span>
                    <span>Todos los derechos reservados</span>
                </div>
            </div>
        </footer>
    );
}