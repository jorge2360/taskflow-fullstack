# TaskFlow Fullstack

Aplicación fullstack para gestión de tareas desarrollada con Laravel API y React.

---

## Descripción

TaskFlow Fullstack es una aplicación web orientada a la administración de tareas mediante arquitectura separada entre backend y frontend.

El proyecto implementa autenticación basada en tokens utilizando Laravel Sanctum, consumo de API REST desde React y gestión completa de tareas mediante operaciones CRUD.

La aplicación permite:

- Registro e inicio de sesión de usuarios.
- Gestión de tareas protegidas por autenticación.
- Creación, edición y eliminación de tareas.
- Búsqueda y filtros dinámicos.
- Dashboard administrativo.
- Arquitectura frontend/backend separada.

---

## Tecnologías utilizadas

### Backend

- Laravel
- PHP
- MySQL
- Laravel Sanctum
- API REST
- Eloquent ORM
- PostgreSQL

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM

### Herramientas

- Git
- GitHub
- Postman
- Composer
- npm
- Render
- Vercel

---

## Arquitectura del proyecto

```text
taskflow-fullstack/
├── backend/
└── frontend/
```

---

## Funcionalidades

### Autenticación

- Registro de usuarios
- Inicio de sesión
- Logout
- Protección mediante tokens
- Rutas protegidas

### Gestión de tareas

- Crear tareas
- Listar tareas
- Editar tareas
- Eliminar tareas
- Filtros por estado
- Filtros por prioridad
- Búsqueda dinámica
- Dashboard de tareas

### Interfaz

- Diseño responsive
- Dashboard moderno
- Badges visuales
- Manejo visual de errores
- Navegación protegida
- Animaciones suaves

---

# Backend Laravel API

## Instalación backend

Ingresar a la carpeta backend:

```bash
cd backend
```

Instalar dependencias:

```bash
composer install
```

Copiar variables de entorno:

```bash
copy .env.example .env
```

Generar clave:

```bash
php artisan key:generate
```

Configurar base de datos en `.env`:

```env
DB_DATABASE=taskflow_api
DB_USERNAME=root
DB_PASSWORD=
```

Ejecutar migraciones:

```bash
php artisan migrate
```

Ejecutar servidor:

```bash
php artisan serve
```

Backend disponible en:

```text
http://127.0.0.1:8000
```

---

## Endpoints principales

### Autenticación

| Método | Endpoint | Descripción |
|---|---|---|
| POST | /api/register | Registro |
| POST | /api/login | Inicio de sesión |
| GET | /api/me | Usuario autenticado |
| POST | /api/logout | Cerrar sesión |

### Tareas

| Método | Endpoint | Descripción |
|---|---|---|
| GET | /api/tasks | Listar tareas |
| POST | /api/tasks | Crear tarea |
| GET | /api/tasks/{id} | Obtener tarea |
| PUT | /api/tasks/{id} | Actualizar tarea |
| DELETE | /api/tasks/{id} | Eliminar tarea |

---

# Frontend React

## Instalación frontend

Ingresar a la carpeta frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar entorno de desarrollo:

```bash
npm run dev
```

Frontend disponible en:

```text
http://localhost:5173
```

---

## Buenas prácticas implementadas

- Arquitectura frontend/backend separada
- API REST con Laravel
- Autenticación mediante tokens
- Protección de rutas
- Manejo de estado
- Componentización en React
- Uso de Axios interceptors
- Validaciones backend
- Middleware de autenticación
- Uso de Eloquent ORM
- Diseño responsive con Tailwind CSS

---

## Flujo general

1. Usuario se registra o inicia sesión.
2. Laravel genera token Sanctum.
3. React almacena token en localStorage.
4. Axios envía automáticamente el token.
5. Backend protege endpoints mediante `auth:sanctum`.
6. Usuario administra tareas desde el dashboard.

---

## Demo en línea

Frontend:
https://taskflow-fullstack-eight.vercel.app

Backend API:
https://taskflow-fullstack-frnh.onrender.com/api

## Autor

Jorge García