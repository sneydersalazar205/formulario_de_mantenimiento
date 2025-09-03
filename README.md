# Formulario de Mantenimiento

Proyecto web responsivo para promocionar servicios de mantenimiento de computadoras. Incluye una landing page con formulario de agendamiento y un botón de acceso al login donde se muestra la tabla de cita

## Requisitos

- Node.js 18+
- MySQL o MariaDB

## Instalación

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Crea un archivo `.env` basado en `.env.example` con los datos de conexión y el secreto JWT.
3. Inicia MySQL (por ejemplo con XAMPP) y ejecuta el script `schema.sql` para crear las tablas y un usuario de prueba (`admin@example.com` / `admin123`).

## Uso

```bash
npm start
```


### Conexión con XAMPP

1. Inicia Apache y MySQL desde el panel de XAMPP.
2. Abre `http://localhost/phpmyadmin` y ejecuta el contenido de `schema.sql` para crear la base de datos `mantenimiento`.
3. En tu archivo `.env` usa:

   ```env
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=mantenimiento
   ```

4. Guarda el archivo y ejecuta `npm start`.

## Endpoints

- `POST /api/auth/login`
- `GET /api/appointments`
- `POST /api/appointments`
- `PUT /api/appointments/:id`
- `DELETE /api/appointments/:id`

## Licencia

MIT
