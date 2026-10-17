import { services } from "./services";

describe("Catálogo de servicios NutriVida", () => {

    test("Debe contener exactamente 18 servicios", () => {
        expect(services).toHaveLength(18);
    });

    test("Todos los servicios deben tener código", () => {
        services.forEach((service) => {
            expect(service.code).toBeTruthy();
        });
    });

    test("No deben existir códigos duplicados", () => {
        const codigos = services.map((service) => service.code);

        expect(new Set(codigos).size).toBe(codigos.length);
    });

    test("Los precios deben ser positivos", () => {
        services.forEach((service) => {
            expect(service.price).toBeGreaterThan(0);
        });
    });

    test("Los precios deben ser numéricos", () => {
        services.forEach((service) => {
            expect(typeof service.price).toBe("number");
        });
    });

    test("Los servicios deben tener nombres válidos", () => {
        services.forEach((service) => {
            expect(service.name.trim().length).toBeGreaterThan(0);
        });
    });

    test("Los servicios deben tener descripción", () => {
        services.forEach((service) => {
            expect(service.description.trim().length).toBeGreaterThan(0);
        });
    });

    test("Los servicios deben pertenecer a categorías válidas", () => {
        const categorias = [
            "Consulta",
            "Plan especializado",
            "Evaluación",
            "Taller grupal",
        ];

        services.forEach((service) => {
            expect(categorias).toContain(service.type);
        });
    });

    test("Debe haber 5 consultas", () => {
        const consultas = services.filter(
            (service) => service.type === "Consulta"
        );

        expect(consultas).toHaveLength(5);
    });

    test("Debe haber 6 planes especializados", () => {
        const planes = services.filter(
            (service) => service.type === "Plan especializado"
        );

        expect(planes).toHaveLength(6);
    });

    test("Debe haber 4 evaluaciones", () => {
        const evaluaciones = services.filter(
            (service) => service.type === "Evaluación"
        );

        expect(evaluaciones).toHaveLength(4);
    });

    test("Debe haber 3 talleres grupales", () => {
        const talleres = services.filter(
            (service) => service.type === "Taller grupal"
        );

        expect(talleres).toHaveLength(3);
    });

    test("CN001 debe costar $35.000", () => {
        const servicio = services.find(
            (service) => service.code === "CN001"
        );

        expect(servicio.price).toBe(35000);
    });

    test("Un servicio inexistente no debe encontrarse", () => {
        const servicio = services.find(
            (service) => service.code === "INVALIDO"
        );

        expect(servicio).toBeUndefined();
    });

});