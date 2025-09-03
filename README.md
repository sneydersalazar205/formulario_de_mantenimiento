# Formulario de Mantenimiento

Proyecto web responsivo para promocionar servicios de mantenimiento de computadoras. Incluye una landing page con formulario de agendamiento y una sección de login con tabla de citas.

## Requisitos

- Node.js 18+
- MySQL o MariaDB

## Instalación

```bash
npm install
```

Crea un archivo `.env` basado en `.env.example` con la configuración de la base de datos y el secreto JWT. Luego ejecuta el script `schema.sql` en tu servidor MySQL para crear las tablas necesarias.

## Uso

```bash
npm start
```

- La página principal se encuentra en `public/index.html`.
- El panel de agenda está en `public/login.html`.

## Endpoints

- `POST /api/auth/login`
- `GET /api/appointments`
- `POST /api/appointments`
- `PUT /api/appointments/:id`
- `DELETE /api/appointments/:id`

## Licencia

MIT
