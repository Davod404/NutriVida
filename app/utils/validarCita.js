export function validarCita(cita, citasExistentes = []) {
    if (!cita.servicioCodigo) {
        return "Debes seleccionar un servicio.";
    }

    if (!cita.nutricionistaId) {
        return "Debes seleccionar un nutricionista.";
    }

    if (!cita.fecha) {
        return "Debes seleccionar una fecha.";
    }

    if (!cita.hora) {
        return "Debes seleccionar una hora.";
    }

    const ocupada = citasExistentes.some(
        (existente) =>
            existente.nutricionistaId === cita.nutricionistaId &&
            existente.fecha === cita.fecha &&
            existente.hora === cita.hora &&
            existente.estado !== "CANCELADA"
    );

    if (ocupada) {
        return "El horario seleccionado ya está ocupado.";
    }

    return null;
}