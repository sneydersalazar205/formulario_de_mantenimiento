document.getElementById('appointmentForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const servicios = Array.from(form.querySelectorAll('input[name="servicios"]:checked')).map(cb => cb.value);
  const data = {
    nombre: form.nombre.value,
    apellido: form.apellido.value,
    telefono: form.telefono.value,
    correo: form.correo.value,
    modalidad: form.modalidad.value,
    servicios,
    descripcion_pc: form.descripcion_pc.value,
    descripcion_problema: form.descripcion_problema.value,
    acepto_terminos: form.terminos.checked
  };

  try {
    const res = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      alert('Cita registrada');
      form.reset();
    } else {
      alert('Error al registrar');
    }
  } catch (err) {
    alert('Servidor no disponible');
  }
});

// Carousel de referencias
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

if (slides.length && nextBtn && prevBtn) {
  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });
}
