export const rolesUsuario = ['paciente', 'profesional', 'administrador'];
export const categoriasPerfil = ['principal', 'alternativo', 'subrogado'];

export var especialidades: string[] = [];

export interface Especialidad {
  idEspecialidad: number;
  nombre: string;
  duracion: number;
}

//EJECUTAR AL INICIAR LA APP?
export function cargarEspecialidades(listaEspecialidades: Especialidad[]) {
  especialidades = [];
  for (let especialidad of listaEspecialidades) {
    especialidades.push(especialidad.nombre);
  }
}

export const seccionales = [
  'Sin definir',
  'Avellaneda',
  'Ituzaingo',
  'La Plata',
  'Lomas de Zamora',
  'Moron',
  'Quilmes'
];