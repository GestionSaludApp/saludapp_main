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

