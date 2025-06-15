import Swal from "sweetalert2";

export const registroController = () => {
  const form = document.querySelector('#formRegistro');
  const usuario = document.querySelector('.usuario');
  const contrasena = document.querySelector('.contrasena');
  const nombre = document.querySelector('.nombre');
  const apellido = document.querySelector('.apellido');
  const cedula = document.querySelector('.cedula');
  const correo = document.querySelector('.correo');
  const telefono = document.querySelector('.telefono');

  const enviar = async (e) => {
    e.preventDefault();

    const data = {
      usuario: usuario.value,
      contrasena: contrasena.value,
      nombre: nombre.value,
      apellido: apellido.value,
      cedula: cedula.value,
      correo: correo.value,
      telefono: telefono.value
    };

    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const response = await res.json();

      if (res.ok && response.success) {
        form.reset();
        Swal.fire({
          title: 'Registro exitoso!',
          text: 'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
          icon: 'success',
          confirmButtonText: 'Ir a login'
        }).then(() => {
          window.location.href = 'login.html';
        });
      } else {
        Swal.fire({
          title: 'Error en el registro',
          text: response.message || 'Verifica tus datos.',
          icon: 'error',
          confirmButtonText: 'Reintentar'
        });
      }

    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error del servidor',
        text: 'No se pudo conectar con el servidor. Intenta más tarde.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    }
  };

  form.addEventListener('submit', enviar);
};

registroController();