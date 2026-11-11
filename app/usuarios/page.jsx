"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../components/templates/DashboardLayout";
import PageTitle from "../components/molecules/PageTitle";
import Button from "../components/atoms/Button";
import Icon from "../components/atoms/Icon";

export default function AdminUsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [rol, setRol] = useState("Todos");
    const [loading, setLoading] = useState(true);
    
    const [modalAbierto, setModalAbierto] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [form, setForm] = useState({
        username: "", email: "", password: "", telefono: "", rol: "Paciente", nombre: "", apellido: ""
    });
    const [errorForm, setErrorForm] = useState("");

    const cargarUsuarios = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:8080/api/usuarios", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!res.ok) throw new Error("Error al cargar");
            const data = await res.json();
            setUsuarios(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const usuariosFiltrados = usuarios.filter((u) => {
        const texto = busqueda.toLowerCase();
        const coincideBusqueda =
            (u.username && u.username.toLowerCase().includes(texto)) ||
            (u.email && u.email.toLowerCase().includes(texto));
        const coincideRol = rol === "Todos" || u.rol === rol;
        return coincideBusqueda && coincideRol;
    });

    const abrirModalCrear = () => {
        setUsuarioEditando(null);
        setForm({ username: "", email: "", password: "", telefono: "", rol: "Paciente", nombre: "", apellido: "" });
        setErrorForm("");
        setModalAbierto(true);
    };

    const abrirModalEditar = (usuario) => {
        setUsuarioEditando(usuario);
        setForm({ username: usuario.username, email: usuario.email, password: "", telefono: usuario.telefono || "", rol: usuario.rol, nombre: "", apellido: "" });
        setErrorForm("");
        setModalAbierto(true);
    };

    const guardarUsuario = async (e) => {
        e.preventDefault();
        setErrorForm("");
        try {
            const token = localStorage.getItem("token");
            
            if (usuarioEditando) {
                await fetch(`http://localhost:8080/api/usuarios/${usuarioEditando.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                    body: JSON.stringify({
                        username: form.username, email: form.email, telefono: form.telefono, rol: form.rol
                    })
                });
            } else {
                const res = await fetch("http://localhost:8080/api/usuarios", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                    body: JSON.stringify(form)
                });
                if (!res.ok) throw new Error("Error al crear usuario");
            }
            
            setModalAbierto(false);
            cargarUsuarios();
        } catch (error) {
            setErrorForm("Error al guardar. Verifica los datos o el correo ya existe.");
        }
    };

    async function cambiarEstado(id, estadoActual) {
        try {
            const token = localStorage.getItem("token");
            await fetch(`http://localhost:8080/api/usuarios/${id}/estado`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ activo: !estadoActual })
            });
            cargarUsuarios();
        } catch (error) {
            alert("Error al cambiar el estado");
        }
    }

    return (
        <DashboardLayout role="Administrador">
            <PageTitle
                title="Gestión de Usuarios"
                subtitle="Administra cuentas, roles y estados."
                action={
                    <Button onClick={abrirModalCrear}>
                        <Icon name="plus" size={17} />
                        Crear usuario
                    </Button>
                }
            />

            <div className="panel users-panel">
                <div className="panel-head">
                    <div className="table-actions">
                        <div className="table-search">
                            <Icon name="search" size={17} />
                            <input placeholder="Buscar usuario..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
                        </div>
                        <select className="filter-button" value={rol} onChange={(e) => setRol(e.target.value)}>
                            <option value="Todos">Todos los roles</option>
                            <option value="Paciente">Pacientes</option>
                            <option value="Nutricionista">Nutricionistas</option>
                            <option value="Administrador">Administradores</option>
                        </select>
                    </div>
                </div>

                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Rol</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4" style={{ textAlign: "center" }}>Cargando...</td></tr>
                            ) : (
                                usuariosFiltrados.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>
                                            <div className="table-user">
                                                <span>{usuario.username.substring(0, 2).toUpperCase()}</span>
                                                <div>
                                                    <b>{usuario.username}</b>
                                                    <small>{usuario.email}</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td><span className={`role-tag ${usuario.rol === "Nutricionista" ? "purple" : ""}`}>{usuario.rol}</span></td>
                                        <td><span className={`status ${usuario.activo ? "green" : "gray"}`}>{usuario.activo ? "Activo" : "Inactivo"}</span></td>
                                        <td style={{ display: "flex", gap: "8px" }}>
                                            <button className="icon-button" onClick={() => abrirModalEditar(usuario)} title="Editar">
                                                <Icon name="edit" size={17} />
                                            </button>
                                            <button
                                                className="small-outline"
                                                onClick={() => cambiarEstado(usuario.id, usuario.activo)}
                                                style={usuario.activo ? { borderColor: '#e0b4b4', color: '#a15252', backgroundColor: '#fffafa' } : { borderColor: '#b4e0c3', color: '#1f6b4f', backgroundColor: '#f9fffb' }}
                                            >
                                                {usuario.activo ? "Desactivar" : "Activar"}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {modalAbierto && (
                <div style={{
                    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
                }}>
                    <div style={{ background: "white", padding: "30px", borderRadius: "16px", width: "90%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                            <h2>{usuarioEditando ? "Editar Usuario" : "Crear Usuario"}</h2>
                            <button onClick={() => setModalAbierto(false)} className="icon-button"><Icon name="close" size={24} /></button>
                        </div>
                        
                        <form onSubmit={guardarUsuario} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                                <input style={{ padding: "10px", borderRadius: "8px", border: "1px solid #dce8e1" }} placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
                                <input style={{ padding: "10px", borderRadius: "8px", border: "1px solid #dce8e1" }} placeholder="Apellido" value={form.apellido} onChange={e => setForm({...form, apellido: e.target.value})} required />
                                <input style={{ padding: "10px", borderRadius: "8px", border: "1px solid #dce8e1" }} placeholder="Username" value={form.username} onChange={e => setForm({...form, username: e.target.value})} required />
                                <input style={{ padding: "10px", borderRadius: "8px", border: "1px solid #dce8e1" }} placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                                <input style={{ padding: "10px", borderRadius: "8px", border: "1px solid #dce8e1" }} placeholder="Teléfono" value={form.telefono} onChange={e => setForm({...form, telefono: e.target.value})} />
                                
                                {!usuarioEditando && (
                                    <input style={{ padding: "10px", borderRadius: "8px", border: "1px solid #dce8e1" }} placeholder="Contraseña" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
                                )}
                                
                                <select style={{ padding: "10px", borderRadius: "8px", border: "1px solid #dce8e1" }} value={form.rol} onChange={e => setForm({...form, rol: e.target.value})}>
                                    <option value="Paciente">Paciente</option>
                                    <option value="Nutricionista">Nutricionista</option>
                                    <option value="Administrador">Administrador</option>
                                </select>
                            </div>
                            {errorForm && <p className="form-error">{errorForm}</p>}
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                                <Button variant="outline" onClick={() => setModalAbierto(false)}>Cancelar</Button>
                                <Button type="submit">Guardar</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}