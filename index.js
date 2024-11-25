import { registrarCita, listCitas, deleteCita, updateCita } from './operaciones.js';

const arg = process.argv.slice(2);
const [option, ...params] = arg;

// Función principal para ejecutar las acciones
const main = async () => {
    switch (option) {
        case "registrar":
            if (params.length >= 5) {
                const [NombredelAnimal, Edad, TipodeAnimal, ColordelAnimal, Enfermedad] = params;
                const cita = {
                    NombredelAnimal,
                    Edad,
                    TipodeAnimal,
                    ColordelAnimal,
                    Enfermedad,
                };
                await registrarCita(cita);
            } else {
                console.log("Por favor, proporciona todos los datos: Nombre, Edad, Tipo, Color, Enfermedad.");
            }
            break;

        case "leer":
            await listCitas();
            break;

        case "delete":
            if (params.length === 1) {
                const index = parseInt(params[0]) - 1; // Convertir texto a índice (1 basado)
                await deleteCita(index);
            } else {
                console.log("Por favor, proporciona el número de la cita a borrar.");
            }
            break;

        case "update":
            if (params.length >= 6) {
                const index = parseInt(params[0]) - 1; // Convertir texto a índice (1 basado)
                const [NombredelAnimal, Edad, TipodeAnimal, ColordelAnimal, Enfermedad] = params.slice(1);
                const newCita = {
                    NombredelAnimal,
                    Edad,
                    TipodeAnimal,
                    ColordelAnimal,
                    Enfermedad,
                };
                await updateCita(index, newCita);
            } else {
                console.log("Por favor, proporciona el índice y todos los datos: Nombre, Edad, Tipo, Color, Enfermedad.");
            }
            break;

        default:
            console.log("Opción no válida. Usa 'add <Nombre> <Edad> <Tipo> <Color> <Enfermedad>', 'list', 'delete <número>', o 'update <número> <Nombre> <Edad> <Tipo> <Color> <Enfermedad>'.");
            break;
    }
};

// Ejecutar la función principal
main();
    