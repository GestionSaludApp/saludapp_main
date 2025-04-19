const diccionarioCompleto = {
    es: {
        mensajeDefault: 'Este es el componente: ',
        inicio: 'Inicio',
        usuario: 'Usuario',
        ingreso: 'Ingresar',
        registro: 'Registrarse',
        datosPersonales: 'Datos personales',
        calendario: 'Calendario',
        ayuda: 'Ayuda',
        error: 'Ups, algo salió mal.',
        escribaSu: 'Escriba su',
        selecccionarTipo: 'Seleccioná el tipo de usuario',
        faltaInformacion: 'Faltan datos necesarios',
        email: 'Email',
        password: 'Contraseña',
        confirmarpassword: 'Confirmar contraseña',
        rol: 'Rol',
        guardar: 'Guardar',
        advertenciaEmail: 'El correo electrónico debe tener un formato válido (ej: texto@correo.com).',
        advertenciaPassword: 'La contraseña debe tener al menos 8 caracteres, incluir al menos una mayúscula, una minúscula, un número y un carácter especial.',
        advertenciaConfirmacionPassword: 'Las contraseñas no coinciden.',
        nombre: 'Nombre',
        apellido: 'Apellido',
        dni: 'DNI',
        especialidad: 'Especialidad',
        advertenciaNombres: 'Nombre inválido: solo debe contener letras y espacios.',
        advertenciaDNI: 'DNI inválido: debe contener solo números.',
        fechaNacimiento: 'Fecha de nacimiento',
        registroExitoso: 'Usuario registrado con éxito.',
        registroFallido: 'No se pudo completar el registro. Intente nuevamente o verifique los datos.',
        ingresoFallido: 'No se pudo completar el ingreso. Intente nuevamente o verifique los datos.',
    },
    en: {
      mensajeDefault: 'This is the component: ',
      inicio: 'Home',
      usuario: 'User',
      ingreso: 'Login',
      registro: 'Register',
      datosPersonales: 'Personal data',
      calendario: 'Calendar',
      ayuda: 'Help',
      error: 'Oops, something went wrong.',
      escribaSu: 'Write your',
      selecccionarTipo: 'Select the type of user',
      faltaInformacion: 'Needed data is missing',
      email: 'Email',
      password: 'Password',
      confirmarpassword: 'Confirm password',
      rol: 'Role',
      guardar: 'Save',
      advertenciaEmail: 'Email must have a valid format (example: text@email.com).',
      advertenciaPassword: 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.',
      advertenciaConfirmacionPassword: 'Passwords must match.',
      nombre: 'Name',
      apellido: 'Last name',
      dni: 'ID number',
      especialidad: 'Specialty',
      advertenciaNombres: 'Invalid name: It most only contain letters and spaces.',
      advertenciaDNI: 'Invalid ID: It most only contain numbers.',
      fechaNacimiento: 'Date of birth',
      registroExitoso: 'User sucessfully registered.',
      registroFallido: 'Registration could not be completed. Please try again or verify your details.',
      ingresoFallido: 'Login could not be completed. Please try again or verify your details.',
    }
  };
  
//Idioma actual
let idiomaActual: keyof typeof diccionarioCompleto = 'es';

//Funcion para cambiar idioma
export function cambiarIdioma(nuevoIdioma: keyof typeof diccionarioCompleto) {
  idiomaActual = nuevoIdioma;
}

export function obtenerDiccionario() {
  return diccionarioCompleto[idiomaActual];
}