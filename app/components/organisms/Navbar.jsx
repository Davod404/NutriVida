import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="main-nav">
            <Link href="/" className="active">
                Inicio
            </Link>

            <Link href="/servicios">
                Servicios y planes
            </Link>

            <Link href="/agendar">
                Agendar cita
            </Link>
        </nav>
    );
}