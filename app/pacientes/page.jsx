"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../components/templates/DashboardLayout";
import PageTitle from "../components/molecules/PageTitle";
import Icon from "../components/atoms/Icon";
import { getAgendaNutricionista } from "../utils/api";

export default function PacientesPage() {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function cargarPacientes() {
            try {
                const data = await getAgendaNutricionista();
                
                const unicos = [];
                const vistos = new Set();
                
                data.forEach(c => {
                    if (!vistos.has(c.paciente.id)) {
                        vistos.add(c.paciente.id);
                        unicos.push({
                            id: c.paciente.id,
                            nombre: c.paciente.nombre + " " + c.paciente.apellido,
                            email: c.paciente.usuario.email,
                            telefono: c.paciente.usuario.telefono || "No registrado",
                            iniciales: (c.paciente.nombre[0] + c.paciente.apellido[0]).toUpperCase()
                        });
                    }
                });
                
                setPacientes(unicos);
            } catch (error) {
                console.error("Error al cargar pacientes:", error);
            } finally {
                setLoading(false);
            }
        }
        cargarPacientes();
    }, []);

    if (loading) {
        return (
            <DashboardLayout role="Nutricionista">
                <div style={{ padding: "50px", textAlign: "center" }}>Cargando pacientes...</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout role="Nutricionista">
            <PageTitle
                title="Mis pacientes"
                subtitle="Pacientes que han agendado una cita contigo."
            />

            <div className="panel users-panel">
                <div className="panel-head">
                    <div>
                        <h2>Listado de pacientes</h2>
                        <p>Tienes {pacientes.length} pacientes en tu historial</p>
                    </div>
                </div>

                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Paciente</th>
                                <th>Correo electrónico</th>
                                <th>Teléfono</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pacientes.length === 0 ? (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: "center", padding: "30px" }}>
                                        No tienes pacientes registrados aún.
                                    </td>
                                </tr>
                            ) : (
                                pacientes.map((paciente) => (
                                    <tr key={paciente.id}>
                                        <td>
                                            <div className="table-user">
                                                <span>{paciente.iniciales}</span>
                                                <div>
                                                    <b>{paciente.nombre}</b>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{paciente.email}</td>
                                        <td>{paciente.telefono}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}