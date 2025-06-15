import Swal from "sweetalert2";

const form = document.querySelector('#formLogin');
const usuario = document.querySelector('.usuario');
const contrasena = document.querySelector('.contrasena');

const enviar = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        usuario: usuario.value,
        contrasena: contrasena.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return Swal.fire({
        title: 'Error al iniciar sesión',
        text: data.message || 'Credenciales incorrectas',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    Swal.fire({
      title: 'Inicio de sesión exitoso',
      text: `Bienvenido ${usuario.value}`,
      icon: 'success',
      confirmButtonText: 'Entrar'
    }).then(() => {
      window.location.href = '../../menu.html';
    });

  } catch (error) {
    console.error(error);
    Swal.fire({
      title: 'Error del servidor',
      text: 'No se pudo conectar con el backend',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
};

form.addEventListener('submit', enviar);