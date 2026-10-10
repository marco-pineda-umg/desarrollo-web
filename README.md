# Tiendarte — Tarea 4

Tienda en línea desarrollada con React, Vite, Bootstrap y React-Bootstrap, con backend en Node.js, Express y MongoDB Atlas.

## Resumen

Los productos y usuarios ahora se guardan en MongoDB Atlas. El login valida los datos en la base de datos, el perfil se carga desde el servidor y los productos se pueden crear, editar y eliminar desde la página.

## Estado global

Opción A: Context API + useReducer. AuthProvider centraliza la sesión y useAuth expone el estado y dispatch.

Acciones: LOGIN_START, LOGIN, LOGIN_ERROR y LOGOUT.

## Backend

Carpeta backend/src: config, models, controllers, routes y middleware.

Endpoints: /api/auth (register, login, me) y /api/recursos (listar, detalle, crear, editar y eliminar).

## Enlace

https://sage-palmier-122a74.netlify.app

La publicación de la versión de Tarea 4 está pendiente.

## Integrante

- Nombre completo: Marco Tulio Pineda Recinos
- Carné: 9490-23-2906

## Ejecutar

Crear los archivos .env a partir de .env.example.

```sh
cd backend
npm install
npm run seed
npm run dev
```

En otra terminal:

```sh
npm install
npm run dev
```

## Verificar y compilar

```sh
npm run lint
npm run build
```

En Netlify: comando de compilación `npm run build` y directorio de publicación `dist`.
