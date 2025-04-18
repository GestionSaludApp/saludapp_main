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
        escribirEmail: 'Escriba su email',
        escribirPassword: 'Escriba una contraseña',
        selecccionarTipo: 'Seleccioná el tipo de usuario',
        faltaInformacion: 'Faltan datos necesarios',
        email: 'Email',
        password: 'Contraseña',
        confirmarpassword: 'Confirmar contraseña',
        rol: 'Rol',
        guardar: 'Guardar',
        advertenciaEmail: 'El correo electrónico debe tener un formato válido (ej: texto@correo.com)',
        advertenciaPassword: 'La contraseña debe tener al menos 8 caracteres, incluir al menos una mayúscula, una minúscula, un número y un carácter especial.',
        advertenciaConfirmacionPassword: 'Las contraseñas no coinciden.',
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
      escribirEmail: 'Write your email',
      escribirPassword: 'Type your password',
      selecccionarTipo: 'Select the type of user',
      faltaInformacion: 'Needed data is missing',
      email: 'Email',
      password: 'Password',
      confirmarpassword: 'Confirm password',
      rol: 'Role',
      guardar: 'Save',
      advertenciaEmail: 'Email must have a valid format (example: text@email.com)',
      advertenciaPassword: 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.',
      advertenciaConfirmacionPassword: 'Passwords must match.',
    }
  };
  
//Idioma actual
let idiomaActual: keyof typeof diccionarioCompleto = 'es';

export function cambiarIdioma(nuevoIdioma: keyof typeof diccionarioCompleto) {
  idiomaActual = nuevoIdioma;
}

//Diccionario actual
export const diccionario = diccionarioCompleto[idiomaActual];