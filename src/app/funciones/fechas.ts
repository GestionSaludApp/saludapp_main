export const fechaAhora = new Date().toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
});

export function convertirADate(fechaHoraStr: string): Date {
    const [fecha, hora] = fechaHoraStr.split(',').map(s => s.trim());
    const [dia, mes, anio] = fecha.split('/').map(Number);
    const [horas, minutos] = hora.split(':').map(Number);

    return new Date(anio, mes - 1, dia, horas, minutos);
}

export function calcularEdad(fechaNacimientoStr: string): number {
    const nacimiento = convertirADate(fechaNacimientoStr);
    const ahora = new Date();

    let edad = ahora.getFullYear() - nacimiento.getFullYear();

    const mesActual = ahora.getMonth();
    const diaActual = ahora.getDate();
    const mesNacimiento = nacimiento.getMonth();
    const diaNacimiento = nacimiento.getDate();

    //Si aún no cumplió años, restamos 1
    if (
        mesActual < mesNacimiento ||
        (mesActual === mesNacimiento && diaActual < diaNacimiento)
    ) {
        edad--;
    }

    return edad;
}
