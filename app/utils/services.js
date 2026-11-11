export function getServiceIcon(type) {
    if (type === "Consulta") return "heart";
    if (type === "Plan especializado") return "leaf";
    if (type === "Evaluación") return "chart";
    if (type === "Taller grupal") return "users";
    return "leaf";
}

export function formatPrice(price) {
    if (typeof price !== "number") return price;
    return `$${price.toLocaleString("es-CL")}`;
}