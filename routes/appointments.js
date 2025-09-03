const express = require('express');
const pool = require('../db');

const router = express.Router();

// Obtener todas las citas
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM appointments');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nueva cita
router.post('/', async (req, res) => {
  const data = req.body;
  try {
    const servicios = Array.isArray(data.servicios) ? data.servicios.join(',') : '';
    const [result] = await pool.query(
      'INSERT INTO appointments (nombre, apellido, telefono, correo, modalidad, servicios, descripcion_pc, descripcion_problema, acepto_terminos, confirmado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)',
      [
        data.nombre,
        data.apellido,
        data.telefono,
        data.correo,
        data.modalidad,
        servicios,
        data.descripcion_pc,
        data.descripcion_problema,
        data.acepto_terminos ? 1 : 0
      ]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar cita
router.put('/:id', async (req, res) => {
  const data = req.body;
  try {
    const servicios = Array.isArray(data.servicios) ? data.servicios.join(',') : data.servicios;
    await pool.query(
      'UPDATE appointments SET nombre=?, apellido=?, telefono=?, correo=?, modalidad=?, servicios=?, descripcion_pc=?, descripcion_problema=?, confirmado=? WHERE id=?',
      [
        data.nombre,
        data.apellido,
        data.telefono,
        data.correo,
        data.modalidad,
        servicios,
        data.descripcion_pc,
        data.descripcion_problema,
        data.confirmado ? 1 : 0,
        req.params.id
      ]
    );
    res.json({ message: 'Actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Borrar cita
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM appointments WHERE id=?', [req.params.id]);
    res.json({ message: 'Eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
