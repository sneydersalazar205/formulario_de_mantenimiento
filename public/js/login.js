const loginForm = document.getElementById('loginForm');
const loginArea = document.getElementById('loginArea');
const agendaArea = document.getElementById('agendaArea');
const agendaBody = document.getElementById('agendaBody');
const modal = document.getElementById('diagnosticoModal');
const diagText = document.getElementById('diagnosticoTexto');
const cerrarDiag = document.getElementById('cerrarDiag');
const guardarDiag = document.getElementById('guardarDiag');
let token = '';
let currentDiagId = null;

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    email: loginForm.email.value,
    password: loginForm.password.value
  };
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (res.ok) {
    const json = await res.json();
    token = json.token;
    loginArea.classList.add('hidden');
    agendaArea.classList.remove('hidden');
    loadAppointments();
  } else {
    alert('Credenciales inválidas');
  }
});

async function loadAppointments() {
  const res = await fetch('/api/appointments', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const citas = await res.json();
  agendaBody.innerHTML = '';
  citas.forEach((c) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${c.nombre} ${c.apellido}</td>
      <td>${c.telefono}<br>${c.correo}</td>
      <td>${c.modalidad}</td>
      <td>${c.servicios}</td>
      <td>${c.confirmado ? 'Sí' : 'No'}</td>
      <td>
        <button data-id="${c.id}" class="confirmar btn">Confirmar</button>
        <button data-id="${c.id}" class="editar btn">Editar</button>
        <button data-id="${c.id}" class="borrar btn">Borrar</button>
        <button data-id="${c.id}" class="diag btn">Diagnóstico</button>
      </td>
    `;
    agendaBody.appendChild(tr);
  });
}

agendaBody.addEventListener('click', async (e) => {
  const id = e.target.dataset.id;
  if (!id) return;
  if (e.target.classList.contains('confirmar')) {
    await fetch('/api/appointments/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ confirmado: 1 })
    });
    loadAppointments();
  } else if (e.target.classList.contains('borrar')) {
    await fetch('/api/appointments/' + id, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token }
    });
    loadAppointments();
  } else if (e.target.classList.contains('editar')) {
    const nuevoNombre = prompt('Nuevo nombre:');
    if (nuevoNombre) {
      await fetch('/api/appointments/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({ nombre: nuevoNombre })
      });
      loadAppointments();
    }
  } else if (e.target.classList.contains('diag')) {
    currentDiagId = id;
    diagText.value = '';
    modal.classList.remove('hidden');
  }
});

cerrarDiag.addEventListener('click', () => {
  modal.classList.add('hidden');
});

guardarDiag.addEventListener('click', () => {
  alert('Diagnóstico guardado para cita ' + currentDiagId);
  modal.classList.add('hidden');
});
