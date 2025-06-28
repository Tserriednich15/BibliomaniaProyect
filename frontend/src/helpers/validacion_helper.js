function mostrarErrorCampo(inputElement, message) {
  inputElement.parentElement.style.position = 'relative';
  
  let errorContainer = inputElement.parentElement.querySelector('.error-message');
  if (!errorContainer) {
    errorContainer = document.createElement('div');
    errorContainer.className = 'error-message';
    inputElement.insertAdjacentElement('afterend', errorContainer);
  }
  errorContainer.textContent = message;
  inputElement.classList.add('is-invalid');
}
function limpiarErrores(formElement) {
    formElement.querySelectorAll('.is-invalid').forEach(input => {
        input.classList.remove('is-invalid');
    });
    formElement.querySelectorAll('.error-message').forEach(error => {
        error.remove();
    });
}
export function validarFormularioAutor(formElement) {
  let esValido = true;
  limpiarErrores(formElement);

  const nombre = formElement.querySelector('#nombre');
  const nacionalidad = formElement.querySelector('#nacionalidad');
  const fecha_nacimiento = formElement.querySelector('#fecha_nacimiento');
  const sitioWeb = formElement.querySelector('#sitio_web');

  const REGEX_NOMBRE = /^[a-zA-Z\sñÑáéíóúÁÉÍÓÚüÜ]+$/;
  const REGEX_URL = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

  if (nombre.value.trim() === '') {
    mostrarErrorCampo(nombre, 'El nombre completo es obligatorio.');
    esValido = false;
  } else if (!REGEX_NOMBRE.test(nombre.value)) {
    mostrarErrorCampo(nombre, 'El nombre solo puede contener letras y espacios.');
    esValido = false;
  }

  if (nacionalidad.value.trim() === '') {
    mostrarErrorCampo(nacionalidad, 'La nacionalidad es obligatoria.');
    esValido = false;
  }

  if (fecha_nacimiento.value.trim() === '') {
    mostrarErrorCampo(fecha_nacimiento, 'La fecha de nacimiento es obligatoria.');
    esValido = false;
  }

  if (sitioWeb.value.trim() !== '' && !REGEX_URL.test(sitioWeb.value)) {
      mostrarErrorCampo(sitioWeb, 'Por favor, introduce una URL válida.');
      esValido = false;
  }

  return esValido;
}
export function validarFormularioVisitante(formElement) {
  let esValido = true;
  limpiarErrores(formElement);

  const cedula = formElement.querySelector('#cedula');
  const nombre = formElement.querySelector('#nombre');
  const apellido = formElement.querySelector('#apellido');
  const correo = formElement.querySelector('#correo');
  const telefono = formElement.querySelector('#telefono');

  const REGEX_NOMBRE = /^[a-zA-Z\sñÑáéíóúÁÉÍÓÚüÜ]+$/;
  const REGEX_NUMEROS = /^\d+$/;
  const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (cedula.value.trim() === '') {
    mostrarErrorCampo(cedula, 'La cédula es obligatoria.');
    esValido = false;
  } else if (!REGEX_NUMEROS.test(cedula.value) || cedula.value.length !== 10) {
    mostrarErrorCampo(cedula, 'La cédula debe contener exactamente 10 dígitos numéricos.');
    esValido = false;
  }

  if (nombre.value.trim() === '') {
    mostrarErrorCampo(nombre, 'El nombre es obligatorio.');
    esValido = false;
  } else if (!REGEX_NOMBRE.test(nombre.value)) {
    mostrarErrorCampo(nombre, 'El nombre solo puede contener letras y espacios.');
    esValido = false;
  }

  if (apellido.value.trim() === '') {
    mostrarErrorCampo(apellido, 'El apellido es obligatorio.');
    esValido = false;
  } else if (!REGEX_NOMBRE.test(apellido.value)) {
    mostrarErrorCampo(apellido, 'El apellido solo puede contener letras y espacios.');
    esValido = false;
  }

  if (correo.value.trim() !== '' && !REGEX_EMAIL.test(correo.value)) {
    mostrarErrorCampo(correo, 'El formato del correo electrónico no es válido.');
    esValido = false;
  }
  
  if (telefono.value.trim() !== '' && (!REGEX_NUMEROS.test(telefono.value) || telefono.value.length !== 10)) {
    mostrarErrorCampo(telefono, 'El teléfono debe contener exactamente 10 dígitos numéricos.');
    esValido = false;
  }

  return esValido;
}
export function validarFormularioCategoria(formElement) {
  let esValido = true;
  limpiarErrores(formElement);

  const nombre = formElement.querySelector('#nombre');
  
  if (nombre.value.trim() === '') {
    mostrarErrorCampo(nombre, 'El nombre de la categoría es obligatorio.');
    esValido = false;
  }
  

  return esValido;
}
export function validarFormularioLibro(formElement) {
  let esValido = true;
  limpiarErrores(formElement);

  const titulo = formElement.querySelector('#titulo');
  const anio_publicacion = formElement.querySelector('#anio_publicacion');
  const autor_id = formElement.querySelector('#autor_id');
  const categoria_id = formElement.querySelector('#categoria_id');
  const editorial_id = formElement.querySelector('#editorial_id');

  const REGEX_ANIO = /^\d{4}$/;

  if (titulo.value.trim() === '') {
    mostrarErrorCampo(titulo, 'El título del libro es obligatorio.');
    esValido = false;
  }
  
  if (anio_publicacion.value.trim() === '') {
    mostrarErrorCampo(anio_publicacion, 'El año de publicación es obligatorio.');
    esValido = false;
  } else if (!REGEX_ANIO.test(anio_publicacion.value)) {
    mostrarErrorCampo(anio_publicacion, 'Debe ser un año válido de 4 dígitos (ej. 2024).');
    esValido = false;
  }

  if (autor_id.value === '') {
    mostrarErrorCampo(autor_id, 'Debes seleccionar un autor.');
    esValido = false;
  }

  if (categoria_id.value === '') {
    mostrarErrorCampo(categoria_id, 'Debes seleccionar una categoría.');
    esValido = false;
  }

  if (editorial_id.value === '') {
    mostrarErrorCampo(editorial_id, 'Debes seleccionar una editorial.');
    esValido = false;
  }

  return esValido;
}
export function validarFormularioPrestamo(formElement) {
  let esValido = true;
  limpiarErrores(formElement);

  const cedula = formElement.querySelector('#visitante-cedula');
  const nombre = formElement.querySelector('#visitante-nombre');
  const apellido = formElement.querySelector('#visitante-apellido');
  const correo = formElement.querySelector('#visitante-correo');
  const telefono = formElement.querySelector('#visitante-telefono');

  const libroSearch = formElement.querySelector('#libro-search');
  const selectedEjemplarId = formElement.querySelector('#selected-ejemplar-id');

  const REGEX_NOMBRE = /^[a-zA-Z\sñÑáéíóúÁÉÍÓÚüÜ]+$/;
  const REGEX_NUMEROS = /^\d+$/;
  const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (cedula) {
    if (cedula.value.trim() === '') {
      mostrarErrorCampo(cedula, 'La cédula es obligatoria.');
      esValido = false;
    } else if (!REGEX_NUMEROS.test(cedula.value) || cedula.value.length !== 10) {
      mostrarErrorCampo(cedula, 'La cédula debe contener exactamente 10 dígitos.');
      esValido = false;
    }
  }

  if (nombre) {
    if (nombre.value.trim() === '') {
      mostrarErrorCampo(nombre, 'El nombre es obligatorio.');
      esValido = false;
    } else if (!REGEX_NOMBRE.test(nombre.value)) {
      mostrarErrorCampo(nombre, 'El nombre solo puede contener letras.');
      esValido = false;
    }
  }

  if (apellido) {
    if (apellido.value.trim() === '') {
      mostrarErrorCampo(apellido, 'El apellido es obligatorio.');
      esValido = false;
    } else if (!REGEX_NOMBRE.test(apellido.value)) {
      mostrarErrorCampo(apellido, 'El apellido solo puede contener letras.');
      esValido = false;
    }
  }

  if (correo && correo.value.trim() !== '' && !REGEX_EMAIL.test(correo.value)) {
    mostrarErrorCampo(correo, 'El formato del correo no es válido.');
    esValido = false;
  }
  
  if (telefono && telefono.value.trim() !== '' && (!REGEX_NUMEROS.test(telefono.value) || telefono.value.length !== 10)) {
    mostrarErrorCampo(telefono, 'El teléfono debe contener 10 dígitos numéricos.');
    esValido = false;
  }
  
  if (selectedEjemplarId && libroSearch) {
    if (selectedEjemplarId.value.trim() === '') {
      mostrarErrorCampo(libroSearch, 'Debes buscar y seleccionar un libro disponible.');
      esValido = false;
    }
  }

  return esValido;
}
export function validarFormularioUsuario(formElement) {
  let esValido = true;
  limpiarErrores(formElement);

  const usuario = formElement.querySelector('#usuario');
  const contrasena = formElement.querySelector('#contrasena');
  const rol = formElement.querySelector('#rol');

  const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const REGEX_NO_ESPACIOS = /^\S*$/;

  if (usuario.value.trim() === '') {
    mostrarErrorCampo(usuario, 'El nombre de usuario es obligatorio.');
    esValido = false;
  } else if (!REGEX_NO_ESPACIOS.test(usuario.value)) {
    mostrarErrorCampo(usuario, 'El nombre de usuario no puede contener espacios.');
    esValido = false;
  }

  if (contrasena.value.trim() === '') {
    mostrarErrorCampo(contrasena, 'La contraseña es obligatoria.');
    esValido = false;
  } else if (!REGEX_PASSWORD.test(contrasena.value)) {
    mostrarErrorCampo(contrasena, 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo (@$!%*?&).');
    esValido = false;
  }

  if (rol.value === '') {
    mostrarErrorCampo(rol, 'Debes seleccionar un rol para el usuario.');
    esValido = false;
  }

  return esValido;
}
export function validarFormularioLogin(formElement) {
  let esValido = true;
  limpiarErrores(formElement);
  
  const usuario = formElement.querySelector('#usuario');
  const contrasena = formElement.querySelector('#contrasena');

  if (usuario.value.trim() === '') {
    mostrarErrorCampo(usuario, 'El nombre de usuario es obligatorio.');
    esValido = false;
  }

  if (contrasena.value.trim() === '') {
    mostrarErrorCampo(contrasena, 'La contraseña es obligatoria.');
    esValido = false;
  }

  return esValido;
}
export function validarFormularioEditorial(formElement) {
  let esValido = true;
  limpiarErrores(formElement);

  const nombre = formElement.querySelector('#nombre');
  const pais = formElement.querySelector('#pais');
  const fundacion = formElement.querySelector('#fundacion');
  const sitioWeb = formElement.querySelector('#sitio_web');
  const email = formElement.querySelector('#contacto_email');

  const REGEX_LETRAS_ESPACIOS = /^[a-zA-Z\sñÑáéíóúÁÉÍÓÚüÜ]+$/;
  const REGEX_URL = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (nombre.value.trim() === '') {
    mostrarErrorCampo(nombre, 'El nombre de la editorial es obligatorio.');
    esValido = false;
  }

  if (pais.value.trim() === '') {
    mostrarErrorCampo(pais, 'El país es obligatorio.');
    esValido = false;
  } else if (!REGEX_LETRAS_ESPACIOS.test(pais.value)) {
    mostrarErrorCampo(pais, 'El país solo puede contener letras y espacios.');
    esValido = false;
  }

  if (fundacion.value.trim() === '') {
      mostrarErrorCampo(fundacion, 'El año de fundación es obligatorio.');
      esValido = false;
  } else {
    const anioNum = parseInt(fundacion.value, 10);
    if (isNaN(anioNum) || anioNum < 1901 || anioNum > 2155) {
      mostrarErrorCampo(fundacion, 'Debe ser un año válido (ej. 1901-2155).');
      esValido = false;
    }
  }

  if (sitioWeb.value.trim() !== '' && !REGEX_URL.test(sitioWeb.value)) {
    mostrarErrorCampo(sitioWeb, 'Por favor, introduce una URL válida.');
    esValido = false;
  }
  
  if (email.value.trim() !== '' && !REGEX_EMAIL.test(email.value)) {
    mostrarErrorCampo(email, 'El formato del correo electrónico no es válido.');
    esValido = false;
  }

  return esValido;
}