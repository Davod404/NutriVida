const API_URL = "http://localhost:8080/api";

async function fetchAPI(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error en la petición");
    }

    return response.json();
}

export async function getServicios() {
    const data = await fetchAPI("/servicios");
    
    return data.map((s) => ({
        code: s.codigo,
        type: s.tipo,
        name: s.nombre,
        duration: s.duracion,
        mode: s.modalidad,
        professional: s.profesional,
        price: s.precio,
        description: s.descripcion,
    }));
}

export async function login(email, password) {
    const data = await fetchAPI("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
    localStorage.setItem("token", data.token);
    return data;
}

export async function register(userData) {
    const data = await fetchAPI("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
    });
    localStorage.setItem("token", data.token);
    return data;
}

export async function crearCita(citaData) {
    return await fetchAPI("/citas", {
        method: "POST",
        body: JSON.stringify(citaData),
    });
}

export async function getMisCitas() {
    return await fetchAPI("/citas/mis-citas");
}

export async function cancelarCita(id) {
    return await fetchAPI(`/citas/${id}/cancelar`, {
        method: "PUT",
    });
}

export async function getMe() {
    return await fetchAPI("/auth/me");
}

export async function getNutricionistas() {
    return await fetchAPI("/nutricionistas");
}

export async function getAgendaNutricionista() {
    return await fetchAPI("/citas/agenda");
}

export async function actualizarEstadoCita(id, nuevoEstado) {
    return await fetchAPI(`/citas/${id}/estado?nuevoEstado=${nuevoEstado}`, {
        method: "PUT",
    });
}