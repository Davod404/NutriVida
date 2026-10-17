import { services } from "./services";

describe("Filtros y ordenamiento de servicios", () => {

    test("Filtrar consultas", () => {
        const resultado = services.filter(
            (service) => service.type === "Consulta"
        );

        expect(resultado).toHaveLength(5);
    });

    test("Filtrar planes especializados", () => {
        const resultado = services.filter(
            (service) => service.type === "Plan especializado"
        );

        expect(resultado).toHaveLength(6);
    });

    test("Filtrar servicios online", () => {
        const resultado = services.filter(
            (service) => service.mode.includes("Online")
        );

        expect(resultado.length).toBeGreaterThan(0);
    });

    test("Ordenar precios de menor a mayor", () => {
        const ordenados = [...services].sort(
            (a, b) => a.price - b.price
        );

        for (let i = 1; i < ordenados.length; i++) {
            expect(ordenados[i].price).toBeGreaterThanOrEqual(
                ordenados[i - 1].price
            );
        }
    });

    test("Ordenar precios de mayor a menor", () => {
        const ordenados = [...services].sort(
            (a, b) => b.price - a.price
        );

        for (let i = 1; i < ordenados.length; i++) {
            expect(ordenados[i].price).toBeLessThanOrEqual(
                ordenados[i - 1].price
            );
        }
    });

    test("Ordenar no debe modificar el catálogo original", () => {
        const codigosOriginales = services.map(
            (service) => service.code
        );

        [...services].sort((a, b) => a.price - b.price);

        expect(services.map((service) => service.code))
            .toEqual(codigosOriginales);
    });

});