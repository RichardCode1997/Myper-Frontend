# MYPER Software - Frontend 🖥️

Aplicación web desarrollada en **Vue.js 3** como prueba técnica para el puesto de Desarrollador Frontend en MYPER Software. Implementa un sistema CRUD completo para la gestión de usuarios, consumiendo una API REST pública.

---

## 🚀 Módulos y Funcionalidades

### 🔐 Autenticación Simulada
- **Login con validación contra API:** El username se valida en tiempo real contra los datos de `JSONPlaceholder`. Si el usuario existe, el acceso es concedido.
- **Protección de rutas:** Implementada con **Vue Router Navigation Guards**. Sin sesión activa, el sistema redirige automáticamente al login.
- **Gestión de sesión:** La sesión del usuario se almacena en `localStorage` y se destruye al cerrar sesión.

> **Nota:** En un sistema productivo, el backend generaría un token **JWT** al validar las credenciales. El frontend Vue almacenaría ese token y lo enviaría en cada request protegido mediante el header **Authorization: Bearer <token>**.

### 👥 Gestión de Usuarios (CRUD Completo)
- **Listar:** Obtiene los usuarios desde la API y los almacena en un array local reactivo. Muestra un indicador de carga (spinner) mientras se realiza la petición.
- **Crear:** Formulario en modal con generación automática de ID correlativo y validación de campos.
- **Editar:** Modal pre-cargado con los datos actuales del usuario. Los cambios se aplican sobre el array local según el `id`.
- **Eliminar:** Modal de confirmación antes de remover el registro del array local.

### ✅ Validaciones de Formulario
- Campos obligatorios: nombre, username, teléfono.
- Validación de formato de **correo electrónico** mediante expresión regular.
- Mensajes de error por campo con feedback visual inmediato.

### 🏠 Dashboard
- Panel de control con tarjetas de métricas del sistema.
- Acceso rápido a todos los módulos disponibles.

### 🔧 Módulos en Construcción
- Reportes, Empresas, Ajustes y Notificaciones preparados como rutas activas con vista placeholder.

---

## 🛠️ Stack Tecnológico

- **Vue.js 3** — Composition API con `<script setup>`
- **Vue Router 4** — Navegación SPA con guards de autenticación
- **Vite** — Bundler y servidor de desarrollo
- **JavaScript ES6+**
- **CSS3** — Estilos propios sin frameworks de UI externos

---

## 📁 Estructura del Proyecto

```
myper-frontend/
├── src/
│   ├── assets/
│   │   └── main.css            # Variables CSS globales y estilos base
│   ├── components/
│   │   ├── AppSidebar.vue      # Barra de navegación lateral
│   │   └── AppHeader.vue       # Cabecera con breadcrumb y datos de sesión
│   ├── composables/
│   │   └── useUsers.js         # Lógica CRUD reutilizable (fetch, add, update, delete)
│   ├── router/
│   │   └── index.js            # Definición de rutas y navigation guards
│   ├── views/
│   │   ├── LoginView.vue       # Vista de acceso con validación contra API
│   │   ├── HomeView.vue        # Dashboard principal
│   │   ├── UsuariosView.vue    # CRUD completo de usuarios
│   │   └── ConstruccionView.vue # Vista placeholder para módulos futuros
│   ├── App.vue                 # Componente raíz con lógica de layout
│   └── main.js                 # Punto de entrada, registro de plugins
├── index.html
├── vite.config.js
└── package.json
```

---

## ⚙️ Instalación y Ejecución

### Pre-requisitos
- **Node.js** v18 o superior
- **npm** v9 o superior

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/myper-frontend.git

# 2. Ingresar a la carpeta del proyecto
cd myper-frontend

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 🔑 Credenciales de Prueba

El sistema valida el **username** contra la API de JSONPlaceholder. Puedes usar cualquiera de los siguientes:

| Username   | Contraseña |
|------------|------------|
| Bret       | 1234       |
| Samantha   | 1234       |
| Karianne   | 1234       |
| Antonette  | 1234       |
| Kamren     | 1234       |

> La contraseña es fija (`1234`) para todos los usuarios ya que la API pública no maneja autenticación real.

---

## 🌐 API Utilizada

**JSONPlaceholder** — `https://jsonplaceholder.typicode.com/users`

API pública y gratuita utilizada para obtener el listado inicial de usuarios (GET). Las operaciones de creación, edición y eliminación se gestionan únicamente sobre el **estado local** de la aplicación, tal como indica la especificación de la prueba.