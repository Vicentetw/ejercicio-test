// Seleccionamos el formulario y el div donde mostraremos el resultado
const form = document.getElementById('testForm');
const resultado = document.getElementById('resultado');

// Escuchamos el evento "submit" (cuando el usuario hace clic en "Send")
form.addEventListener('submit', async function (e) {
  e.preventDefault(); // Evita que la página se recargue

  // 1️⃣ Obtenemos los valores ingresados por el usuario
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const blockchain = document.getElementById('blockchain').value.trim();

  // 2️⃣ Validamos que todos los campos estén completos
  if (!name || !email || !blockchain) {
    resultado.textContent = '⚠️ Por favor completa todos los campos.';
    resultado.style.color = 'red';
    return;
  }

  try {
    // 3️⃣ Enviamos los datos al backend usando fetch()
    const response = await fetch('http://localhost:3000/api/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, blockchain })
    });

    // 4️⃣ Procesamos la respuesta del servidor
    const data = await response.json();

    if (data.success) {
      resultado.textContent = `✅ ${data.message}`;
      resultado.style.color = 'green';
      form.reset(); // Limpia el formulario
    } else {
      resultado.textContent = '❌ Hubo un error al enviar tus datos.';
      resultado.style.color = 'red';
    }
  } catch (error) {
    console.error('Error al conectar con el servidor:', error);
    resultado.textContent = '❌ Error al conectar con el servidor.';
    resultado.style.color = 'red';
  }
});
