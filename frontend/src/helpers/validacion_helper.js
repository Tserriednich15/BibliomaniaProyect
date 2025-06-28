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
  
  // Validación de Nombre
  if (nombre.value.trim() === '') {
    mostrarErrorCampo(nombre, 'El nombre de la categoría es obligatorio.');
    esValido = false;
  }
  
  // La descripción es opcional, por lo que no se valida.

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

  // Validación de Título
  if (titulo.value.trim() === '') {
    mostrarErrorCampo(titulo, 'El título del libro es obligatorio.');
    esValido = false;
  }
  
  // Validación de Año de Publicación
  if (anio_publicacion.value.trim() === '') {
    mostrarErrorCampo(anio_publicacion, 'El año de publicación es obligatorio.');
    esValido = false;
  } else if (!REGEX_ANIO.test(anio_publicacion.value)) {
    mostrarErrorCampo(anio_publicacion, 'Debe ser un año válido de 4 dígitos (ej. 2024).');
    esValido = false;
  }

  // Validación de Autor (Select)
  if (autor_id.value === '') {
    mostrarErrorCampo(autor_id, 'Debes seleccionar un autor.');
    esValido = false;
  }

  // Validación de Categoría (Select)
  if (categoria_id.value === '') {
    mostrarErrorCampo(categoria_id, 'Debes seleccionar una categoría.');
    esValido = false;
  }

  // Validación de Editorial (Select)
  if (editorial_id.value === '') {
    mostrarErrorCampo(editorial_id, 'Debes seleccionar una editorial.');
    esValido = false;
  }

  return esValido;
}
export function validarFormularioPrestamo(formElement) {
  let esValido = true;
  limpiarErrores(formElement);

  // Campos del visitante
  const cedula = formElement.querySelector('#visitante-cedula');
  const nombre = formElement.querySelector('#visitante-nombre');
  const apellido = formElement.querySelector('#visitante-apellido');
  const correo = formElement.querySelector('#visitante-correo');
  const telefono = formElement.querySelector('#visitante-telefono');

  // Campo del libro
  const libroSearch = formElement.querySelector('#libro-search');
  const selectedEjemplarId = formElement.querySelector('#selected-ejemplar-id');

  // Regex
  const REGEX_NOMBRE = /^[a-zA-Z\sñÑáéíóúÁÉÍÓÚüÜ]+$/;
  const REGEX_NUMEROS = /^\d+$/;
  const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Validación de Cédula
  if (cedula) { // <-- Se añade esta comprobación
    if (cedula.value.trim() === '') {
      mostrarErrorCampo(cedula, 'La cédula es obligatoria.');
      esValido = false;
    } else if (!REGEX_NUMEROS.test(cedula.value) || cedula.value.length !== 10) {
      mostrarErrorCampo(cedula, 'La cédula debe contener exactamente 10 dígitos.');
      esValido = false;
    }
  }

  // Validación de Nombre
  if (nombre) { // <-- Se añade esta comprobación
    if (nombre.value.trim() === '') {
      mostrarErrorCampo(nombre, 'El nombre es obligatorio.');
      esValido = false;
    } else if (!REGEX_NOMBRE.test(nombre.value)) {
      mostrarErrorCampo(nombre, 'El nombre solo puede contener letras.');
      esValido = false;
    }
  }

  // Validación de Apellido
  if (apellido) { // <-- Se añade esta comprobación
    if (apellido.value.trim() === '') {
      mostrarErrorCampo(apellido, 'El apellido es obligatorio.');
      esValido = false;
    } else if (!REGEX_NOMBRE.test(apellido.value)) {
      mostrarErrorCampo(apellido, 'El apellido solo puede contener letras.');
      esValido = false;
    }
  }

  // Validación de Correo (opcional)
  if (correo && correo.value.trim() !== '' && !REGEX_EMAIL.test(correo.value)) {
    mostrarErrorCampo(correo, 'El formato del correo no es válido.');
    esValido = false;
  }
  
  // Validación de Teléfono (opcional)
  if (telefono && telefono.value.trim() !== '' && (!REGEX_NUMEROS.test(telefono.value) || telefono.value.length !== 10)) {
    mostrarErrorCampo(telefono, 'El teléfono debe contener 10 dígitos numéricos.');
    esValido = false;
  }
  
  // Validación de Selección de Libro
  if (selectedEjemplarId && libroSearch) { // <-- Se añade esta comprobación
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

  // Regex para contraseña: Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial.
  const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const REGEX_NO_ESPACIOS = /^\S*$/; // Verifica que no haya espacios

  // Validación de Usuario
  if (usuario.value.trim() === '') {
    mostrarErrorCampo(usuario, 'El nombre de usuario es obligatorio.');
    esValido = false;
  } else if (!REGEX_NO_ESPACIOS.test(usuario.value)) {
    mostrarErrorCampo(usuario, 'El nombre de usuario no puede contener espacios.');
    esValido = false;
  }

  // Validación de Contraseña
  if (contrasena.value.trim() === '') {
    mostrarErrorCampo(contrasena, 'La contraseña es obligatoria.');
    esValido = false;
  } else if (!REGEX_PASSWORD.test(contrasena.value)) {
    mostrarErrorCampo(contrasena, 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo (@$!%*?&).');
    esValido = false;
  }

  // Validación de Rol
  if (rol.value === '') {
    mostrarErrorCampo(rol, 'Debes seleccionar un rol para el usuario.');
    esValido = false;
  }

  return esValido;
}
export function validarFormularioLogin(formElement) {
  let esValido = true;
  limpiarErrores(formElement); // [cite: 6, 9]

  const usuario = formElement.querySelector('#usuario');
  const contrasena = formElement.querySelector('#contrasena');

  if (usuario.value.trim() === '') {
    mostrarErrorCampo(usuario, 'El nombre de usuario es obligatorio.'); // [cite: 6, 7, 8]
    esValido = false;
  }

  if (contrasena.value.trim() === '') {
    mostrarErrorCampo(contrasena, 'La contraseña es obligatoria.'); // [cite: 6, 7, 8]
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

  // 1. Validar Nombre (obligatorio)
  if (nombre.value.trim() === '') {
    mostrarErrorCampo(nombre, 'El nombre de la editorial es obligatorio.');
    esValido = false;
  }

  // 2. Validar País (¡AHORA ES OBLIGATORIO!)
  if (pais.value.trim() === '') { // <-- CAMBIO 1: Primero verificamos si está vacío.
    mostrarErrorCampo(pais, 'El país es obligatorio.');
    esValido = false;
  } else if (!REGEX_LETRAS_ESPACIOS.test(pais.value)) { // <-- CAMBIO 2: Luego verificamos el formato.
    mostrarErrorCampo(pais, 'El país solo puede contener letras y espacios.');
    esValido = false;
  }

  // 3. Validar Año de Fundación (opcional)
  if (fundacion.value.trim() !== '') {
    const anioNum = parseInt(fundacion.value, 10);
    if (isNaN(anioNum) || anioNum < 1901 || anioNum > 2155) {
      mostrarErrorCampo(fundacion, 'Debe ser un año válido (ej. 1901-2155).');
      esValido = false;
    }
  }

  // 4. Validar Sitio Web (opcional)
  if (sitioWeb.value.trim() !== '' && !REGEX_URL.test(sitioWeb.value)) {
    mostrarErrorCampo(sitioWeb, 'Por favor, introduce una URL válida.');
    esValido = false;
  }
  
  // 5. Validar Email (opcional)
  if (email.value.trim() !== '' && !REGEX_EMAIL.test(email.value)) {
    mostrarErrorCampo(email, 'El formato del correo electrónico no es válido.');
    esValido = false;
  }

  return esValido;
}