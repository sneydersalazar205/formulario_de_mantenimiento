const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');
const verifyToken = require('./middleware/auth');

app.use('/api/auth', authRoutes);
app.use('/api/appointments', verifyToken, appointmentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
