import { validarRegistro } from "./validarRegistro";

const formularioValido = {
    nombre: "María",
    apellido: "Contreras",
    email: "maria@correo.cl",
    telefono: "+56912345678",
    password: "Clave1234",
    confirmarPassword: "Clave1234",
};

describe("Validación de registro", () => {

    test("Debe aceptar un formulario correcto", () => {
        expect(
            validarRegistro(formularioValido, true)
        ).toBeNull();
    });

    test("Debe rechazar campos vacíos", () => {
        const form = {
            ...formularioValido,
            nombre: "",
        };

        expect(validarRegistro(form, true))
            .toBe("Completa todos los campos.");
    });

    test("Debe rechazar correo inválido", () => {
        const form = {
            ...formularioValido,
            email: "correo-invalido",
        };

        expect(validarRegistro(form, true))
            .toBe("El correo electrónico no es válido.");
    });

    test("Debe rechazar contraseñas cortas", () => {
        const form = {
            ...formularioValido,
            password: "123",
            confirmarPassword: "123",
        };

        expect(validarRegistro(form, true))
            .toBe("La contraseña debe tener al menos 8 caracteres.");
    });

    test("Debe rechazar contraseñas diferentes", () => {
        const form = {
            ...formularioValido,
            confirmarPassword: "OtraClave123",
        };

        expect(validarRegistro(form, true))
            .toBe("Las contraseñas no coinciden.");
    });

    test("Debe rechazar términos no aceptados", () => {
        expect(
            validarRegistro(formularioValido, false)
        ).toBe("Debes aceptar los términos y condiciones.");
    });

    test("Debe rechazar correos duplicados", () => {
        const usuarios = [
            { email: "MARIA@CORREO.CL" },
        ];

        expect(
            validarRegistro(formularioValido, true, usuarios)
        ).toBe("Ya existe una cuenta con este correo.");
    });

});