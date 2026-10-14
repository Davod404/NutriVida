import { services } from "./services"

describe("Catalogo de servicios nutricionales", () => {
    test("debe contener 18 servicios", ()=>{
        expect(services).toHaveLength(18)
    })
    test("todos los servicios deben tener un codigo", ()=>{
        services.forEach((service)=>{
            expect(service.code).toBeTruthy()
        })
    })
    test("los codigos deben ser unicos", () =>{
        const codes = services.map((service) => service.code)
        expect(new Set(codes).size).toBe(codes.length)
    })
    test("todos los precios deben ser mayores que cero", ()=>{
        services.forEach((service)=>{
            expect(service.price).toBeGreaterThan(0)
        })
    })
    test("debe existir primera consulta nutricional",()=>{
        const servicio = services.find(
            (service)=>service.code === "CN001"
        )

        expect(servicio.name).toBe("Primera consulta nutricional")
        expect(servicio.price).toBe(35000)
    })
})