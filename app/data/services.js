export const services = [
    // CONSULTAS
    {
        code: "CN001",
        type: "Consulta",
        name: "Primera consulta nutricional",
        duration: "50 min",
        mode: "Presencial",
        professional: "Nutricionista",
        price: 35000,
        description:
            "Evaluación inicial: anamnesis, antropometría completa y diseño del primer plan alimenticio.",
    },
    {
        code: "CN002",
        type: "Consulta",
        name: "Control nutricional (seguimiento)",
        duration: "30 min",
        mode: "Presencial",
        professional: "Nutricionista",
        price: 25000,
        description:
            "Seguimiento mensual: medición de indicadores y ajuste del plan vigente.",
    },
    {
        code: "CN003",
        type: "Consulta",
        name: "Control nutricional quincenal",
        duration: "30 min",
        mode: "Presencial",
        professional: "Nutricionista",
        price: 22000,
        description:
            "Seguimiento intensivo cada 15 días. Recomendado en los primeros 2 meses.",
    },
    {
        code: "CN004",
        type: "Consulta",
        name: "Teleconsulta nutricional",
        duration: "30 min",
        mode: "Online (video)",
        professional: "Nutricionista",
        price: 20000,
        description:
            "Consulta de seguimiento vía videollamada. Requiere contar con consulta presencial previa.",
    },
    {
        code: "CN005",
        type: "Consulta",
        name: "Consulta de urgencia / reagendada",
        duration: "30 min",
        mode: "Presencial",
        professional: "Nutricionista",
        price: 28000,
        description:
            "Para pacientes que requieren atención fuera de su control habitual.",
    },

    // PLANES ESPECIALIZADOS
    {
        code: "PL001",
        type: "Plan especializado",
        name: "Plan pérdida de peso (1 mes)",
        duration: "—",
        mode: "Presencial",
        professional: "Nutricionista",
        price: 65000,
        description:
            "Incluye primera consulta + 1 control quincenal + plan alimenticio personalizado + seguimiento por WhatsApp.",
    },
    {
        code: "PL002",
        type: "Plan especializado",
        name: "Plan pérdida de peso (3 meses)",
        duration: "—",
        mode: "Presencial",
        professional: "Nutricionista",
        price: 170000,
        description:
            "Incluye primera consulta + 5 controles + 3 planes mensuales + seguimiento continuo.",
    },
    {
        code: "PL003",
        type: "Plan especializado",
        name: "Plan nutrición deportiva (1 mes)",
        duration: "—",
        mode: "Presencial",
        professional: "Nutricionista",
        price: 70000,
        description:
            "Para deportistas y personas con actividad física frecuente. Cálculo de requerimientos energéticos y proteicos.",
    },
    {
        code: "PL004",
        type: "Plan especializado",
        name: "Plan control diabetes / hipertensión",
        duration: "—",
        mode: "Presencial",
        professional: "Nutricionista",
        price: 75000,
        description:
            "Plan adaptado para patologías metabólicas. Coordinación con médico tratante si aplica.",
    },
    {
        code: "PL005",
        type: "Plan especializado",
        name: "Plan alimentación vegetariana/vegana",
        duration: "—",
        mode: "Presencial",
        professional: "Nutricionista",
        price: 68000,
        description:
            "Diseñado para garantizar aporte adecuado de proteínas, hierro, vitamina B12 y calcio sin productos animales.",
    },
    {
        code: "PL006",
        type: "Plan especializado",
        name: "Plan alimentación infantil (2-12 años)",
        duration: "—",
        mode: "Presencial",
        professional: "Nutricionista",
        price: 65000,
        description:
            "Evaluación nutricional pediátrica y diseño de plan adaptado a la etapa de desarrollo del niño.",
    },

    // EVALUACIONES
    {
        code: "EV001",
        type: "Evaluación",
        name: "Antropometría completa",
        duration: "20 min",
        mode: "Presencial",
        professional: "Nutricionista",
        price: 18000,
        description:
            "Peso, talla, IMC, circunferencia de cintura, cadera, brazo y % de grasa corporal con bioimpedanciometría.",
    },
    {
        code: "EV002",
        type: "Evaluación",
        name: "Bioimpedanciometría",
        duration: "15 min",
        mode: "Presencial",
        professional: "Nutricionista",
        price: 12000,
        description:
            "Medición de composición corporal: masa grasa, masa muscular, agua corporal y edad metabólica.",
    },
    {
        code: "EV003",
        type: "Evaluación",
        name: "Encuesta de hábitos alimentarios",
        duration: "20 min",
        mode: "Presencial",
        professional: "Nutricionista",
        price: 10000,
        description:
            "Análisis del patrón alimentario actual. Identificación de déficit y excesos nutricionales.",
    },
    {
        code: "EV004",
        type: "Evaluación",
        name: "Análisis de exámenes de laboratorio",
        duration: "20 min",
        mode: "Presencial",
        professional: "Nutricionista",
        price: 15000,
        description:
            "Interpretación de hemograma, perfil bioquímico y lipídico en contexto nutricional.",
    },

    // TALLERES GRUPALES
    {
        code: "TG001",
        type: "Taller grupal",
        name: "Taller de alimentación saludable",
        duration: "90 min",
        mode: "Presencial (grupo)",
        professional: "Nutricionista",
        price: 15000,
        description:
            "Máx. 10 personas. Conceptos básicos de alimentación equilibrada y lectura de etiquetas.",
    },
    {
        code: "TG002",
        type: "Taller grupal",
        name: "Taller de cocina nutritiva",
        duration: "120 min",
        mode: "Presencial (grupo)",
        professional: "Nutricionista",
        price: 20000,
        description:
            "Preparación de recetas saludables. Incluye degustación. Máx. 8 personas.",
    },
    {
        code: "TG003",
        type: "Taller grupal",
        name: "Taller nutrición para deportistas",
        duration: "90 min",
        mode: "Presencial (grupo)",
        professional: "Nutricionista",
        price: 18000,
        description:
            "Hidratación, nutrición pre y post entrenamiento, suplementación básica. Máx. 12 personas.",
    },
];