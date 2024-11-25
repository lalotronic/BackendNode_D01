import { readFile, writeFile } from "node:fs/promises";

// Función para leer las citas desde el archivo
const leerCitas = async () => {
    try {
        const data = await readFile("citas.json", "utf-8");
        return JSON.parse(data);
    } catch (error) {
        await writeFile("citas.json", JSON.stringify([]));
        return [];
    }
};

// Función para escribir las citas en el archivo
const writeCitas = async (citas) => {
    try {
        await writeFile("citas.json", JSON.stringify(citas, null, 2)); // Formato legible
    } catch (error) {
        console.log(error);
    }
};

// Función para agregar una cita
const registrarCita = async (cita) => {
    const citas = await leerCitas();
    citas.push(cita); // Agrega el objeto cita
    await writeCitas(citas);
    console.log("Cita registrada:", cita);
};

// Función para listar las citas
const listCitas = async () => {
    const citas = await leerCitas();
    citas.forEach((cita, index) => {
        console.log(`${index + 1}. Nombre: ${cita.NombredelAnimal}, Edad: ${cita.Edad}, Tipo: ${cita.TipodeAnimal}, Color: ${cita.ColordelAnimal}, Enfermedad: ${cita.Enfermedad}`);
    });
};

// Función para borrar una cita
const deleteCita = async (index) => {
    const citas = await leerCitas();
    if (index < 0 || index >= citas.length) {
        console.log("Índice de cita no válido.");
        return;
    }
    
    const deletedCita = citas.splice(index, 1); // Elimina la cita del arreglo
    await writeCitas(citas);
    console.log(`Cita borrada: "${deletedCita[0].NombredelAnimal}"`);
};

// Función para actualizar una cita
const updateCita = async (index, newCita) => {
    const citas = await leerCitas();
    if (index < 0 || index >= citas.length) {
        console.log("Índice de cita no válido.");
        return;
    }
    
    citas[index] = newCita; // Actualiza la cita
    await writeCitas(citas);
    console.log(`Cita actualizada: "${citas[index].NombredelAnimal}"`);
};

// Exportar funciones
export { leerCitas, writeCitas, registrarCita, listCitas, deleteCita, updateCita };