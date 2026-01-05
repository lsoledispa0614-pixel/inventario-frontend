# Sistema de Gestión de Inventario - Inventario Fullstack

## Descripción General
Este proyecto consiste en una aplicación web **Fullstack** para la gestión de inventario de una empresa o negocio.  
Permite administrar productos, categorías y registrar movimientos de entrada y salida (IN/OUT), controlando el stock en tiempo real.

El sistema incluye:
- **Autenticación de usuarios** con JWT (Login / Registro)
- CRUD completo para **productos**
- CRUD para **categorías**
- Registro de movimientos **IN/OUT**
- **Historial de movimientos**
- Reporte de **productos con stock bajo**
- Diseño **responsive** (móvil y escritorio)

---

## Objetivo del Proyecto
Desarrollar una aplicación web completa para la administración de inventario que permita:

 Registrar, consultar, actualizar y eliminar productos  
 Control de stock mediante entradas y salidas  
 Registrar el historial de movimientos  
 Autenticación de usuarios  
 Persistencia de datos usando una base de datos relacional (PostgreSQL)  
 Interfaz moderna y responsive usando React + Tailwind  

---

##  Tecnologías Utilizadas

### Backend
- Node.js
- Express
- PostgreSQL
- JWT (Json Web Token)
- bcrypt (encriptación de contraseñas)
- CORS

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM

---

## Estructura del Proyecto

inventario_fullstack/
│
├── src/ # Backend (Express + PostgreSQL)
│ ├── server.js
│ ├── db.js
│
├── Frontend/ # Frontend (React + Tailwind)
│ ├── src/
│ │ ├── api/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│
├── .env # Variables de entorno
├── package.json
└── README.md

yaml


---

##  Instalación del Proyecto

### 1) Requisitos Previos
Antes de ejecutar el proyecto se debe tener instalado:

- Node.js
- PostgreSQL
- pgAdmin (opcional para administrar la BD)

---

## 2) Configuración del Backend

 Entrar en la carpeta raíz del proyecto:

```bash
cd inventario_fullstack
 Instalar dependencias del backend:

bash
npm install
 Ejecutar el backend:

bash
npm start
El servidor backend se ejecutará en:

arduino
http://localhost:3000
3) Configuración del Frontend
Entrar a la carpeta del frontend:

bash
cd Frontend
 Instalar dependencias:

bash
npm install
 Ejecutar React:

bash
npm run dev
 El frontend se ejecutará en:

arduino
http://localhost:5173
Autenticación (JWT)
El sistema usa JWT para proteger rutas privadas.

Login:

Cuando el usuario inicia sesión se genera un token JWT.

Este token se guarda en localStorage.

Se usa para acceder a las rutas protegidas del backend.

 Logout:

El sistema elimina el token y usuario del localStorage

El usuario vuelve al login.

 Funcionalidades del Sistema
 Usuarios
 Registro de usuario
 Inicio de sesión (Login)
 JWT como autenticación

 Categorías
 Crear categoría
 Listar categorías
 Editar categoría
 Eliminar categoría

 Productos
 Crear producto (formulario)
 Listar productos en tabla
 Eliminar producto
 Actualizar producto (disponible en backend)
 Asignar producto a categoría

 Movimientos de Inventario (Control de Stock)
 Registrar entrada (IN)
 Registrar salida (OUT)
 Control automático de stock
 Evita stock negativo (si no hay stock suficiente no permite salida)
 Registro de historial

 Reporte de Stock Bajo
 Muestra productos cuyo stock es menor o igual al mínimo permitido (stock <= min_stock)

 Endpoints Principales del Backend (API REST)
 Auth
POST /api/auth/register

POST /api/auth/login

 Categorías
GET /api/categories

POST /api/categories

PUT /api/categories/:id

DELETE /api/categories/:id

 Productos
GET /api/products

GET /api/products/:id

POST /api/products

PUT /api/products/:id

DELETE /api/products/:id

GET /api/products/low-stock

 Movimientos
GET /api/movements

GET /api/movements/product/:id

POST /api/movements