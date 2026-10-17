import { validarCita } from "./validarCita";

const citaValida = {
    servicioCodigo: "CN001",
    nutricionistaId: 5,
    fecha: "2026-11-20",
    hora: "10:30",
    estado: "PENDIENTE",
};

describe("Validación de reservas", () => {

    test("Debe aceptar una reserva válida", () => {
        expect(validarCita(citaValida)).toBeNull();
    });

    test("Debe rechazar una reserva sin servicio", () => {
        const cita = {
            ...citaValida,
            servicioCodigo: "",
        };

        expect(validarCita(cita))
            .toBe("Debes seleccionar un servicio.");
    });

    test("Debe rechazar una reserva sin nutricionista", () => {
        const cita = {
            ...citaValida,
            nutricionistaId: null,
        };

        expect(validarCita(cita))
            .toBe("Debes seleccionar un nutricionista.");
    });

    test("Debe rechazar una reserva sin fecha", () => {
        const cita = {
            ...citaValida,
            fecha: "",
        };

        expect(validarCita(cita))
            .toBe("Debes seleccionar una fecha.");
    });

    test("Debe rechazar una reserva sin hora", () => {
        const cita = {
            ...citaValida,
            hora: "",
        };

        expect(validarCita(cita))
            .toBe("Debes seleccionar una hora.");
    });

    test("Debe rechazar horarios ocupados", () => {
        const citasExistentes = [
            { ...citaValida, estado: "CONFIRMADA" },
        ];

        expect(validarCita(citaValida, citasExistentes))
            .toBe("El horario seleccionado ya está ocupado.");
    });

    test("Debe permitir horarios de otros nutricionistas", () => {
        const citasExistentes = [
            { ...citaValida, nutricionistaId: 8 },
        ];

        expect(validarCita(citaValida, citasExistentes))
            .toBeNull();
    });

    test("Debe permitir horarios de citas canceladas", () => {
        const citasExistentes = [
            { ...citaValida, estado: "CANCELADA" },
        ];

        expect(validarCita(citaValida, citasExistentes))
            .toBeNull();
    });

});