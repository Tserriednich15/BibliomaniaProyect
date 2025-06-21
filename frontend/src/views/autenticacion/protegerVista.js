const protegerVista = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    window.location.href = '../views/autenticacion/login.html';
  }
};
export default protegerVista;