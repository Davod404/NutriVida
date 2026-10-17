export function validarRegistro(form, terminos, usuarios = []) {
    if (
        !form.nombre?.trim() ||
        !form.apellido?.trim() ||
        !form.email?.trim() ||
        !form.telefono?.trim() ||
        !form.password ||
        !form.confirmarPassword
    ) {
        return "Completa todos los campos.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        return "El correo electrónico no es válido.";
    }

    if (form.password.length < 8) {
        return "La contraseña debe tener al menos 8 caracteres.";
    }

    if (form.password !== form.confirmarPassword) {
        return "Las contraseñas no coinciden.";
    }

    if (!terminos) {
        return "Debes aceptar los términos y condiciones.";
    }

    const existe = usuarios.some(
        (usuario) =>
            usuario.email.toLowerCase() === form.email.trim().toLowerCase()
    );

    if (existe) {
        return "Ya existe una cuenta con este correo.";
    }

    return null;
}