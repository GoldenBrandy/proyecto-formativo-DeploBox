# Documentacion del proyecto

## Proposito
Este proyecto esta dividido en dos aplicaciones principales:

- `backend/`: API y logica de negocio.
- `frontend/`: interfaz de usuario construida con React y Vite.

La organizacion general busca separar responsabilidades, mantener el codigo escalable y facilitar el mantenimiento por dominios funcionales.

## Estructura general

```txt
proyecto-formativo/
  backend/
  frontend/
```

## Frontend

El frontend sigue una arquitectura por features, donde cada dominio agrupa sus componentes, paginas, validaciones y servicios relacionados.

```txt
frontend/
  src/
    app/          Configuracion de React, rutas y protecciones de acceso.
    assets/       Imagenes, iconos y recursos estaticos.
    features/     Modulos por dominio: auth, users, home, products, etc.
    shared/       Componentes reutilizables, layouts, schemas y utilidades.
    styles/       Tokens, estilos globales y reglas semanticas.
```

### Organizacion por feature

Cada feature concentra lo que pertenece a un solo dominio:

```txt
features/example/
  components/   Componentes internos de la feature.
  data/         Datos estaticos o mocks.
  hooks/        Hooks personalizados.
  pages/        Pantallas conectadas a rutas.
  services/     Acceso a APIs o servicios.
  index.js      Punto de entrada publico.
```

### Metodologias y patrones del frontend

- Arquitectura modular basada en features.
- Reutilizacion de UI en `shared/` para evitar duplicacion.
- Separacion entre presentacion, logica de acceso a datos y vistas.
- Uso de BEM para clases CSS semanticas.
- Uso de Tailwind para utilidades rapidas cuando conviene, sin romper la estructura semantica.
- Uso de React Router para navegacion.
- Validacion de formularios y contratos con esquemas.

### Stack principal del frontend

- React
- Vite
- Tailwind CSS
- React Router DOM
- Zod
- TanStack React Table
- Lucide React

## Backend

El backend implementa una API en Node.js con Express y una estructura por capas para aislar responsabilidades.

```txt
backend/
  database/
    migrations/   Cambios versionados del esquema.
    schemas/      Definiciones base de tablas.
    seeds/        Datos iniciales.
  src/
    config/       Conexion y configuracion general.
    features/     Modulos de negocio por dominio.
    middlewares/  Autenticacion y autorizacion.
```

### Organizacion por feature

Cada modulo del backend sigue una separacion similar:

```txt
features/example/
  example.controller.js
  example.service.js
  example.repository.js
  example.routes.js
```

### Metodologias y patrones del backend

- Patrón controller-service-repository.
- API REST para exposicion de recursos.
- Uso de middlewares para autenticacion y permisos.
- Migraciones SQL para controlar la evolucion de la base de datos.
- Validacion de entrada con librerias de esquemas.
- Autenticacion basada en JWT.
- Autorizacion por grupos y permisos.

### Stack principal del backend

- Node.js
- Express
- PostgreSQL
- JWT
- bcrypt
- dotenv
- joi
- pg

## Bases de datos

La carpeta `backend/database/` concentra el control de esquema y datos:

- `migrations/`: cambios incrementales sobre tablas, relaciones y permisos.
- `schemas/`: definiciones base o scripts de estructura.
- `seeds/`: insercion de datos iniciales.

Esta organizacion permite mantener trazabilidad sobre cada cambio de base de datos.

## Metodologias aplicadas en todo el proyecto

- Separacion de responsabilidades.
- Modularizacion por dominio.
- Reutilizacion de componentes y servicios compartidos.
- Versionado de cambios de base de datos mediante migraciones.
- Validacion de datos antes de procesar acciones sensibles.
- Control de acceso por autenticacion y permisos.

## Flujo general de trabajo

1. El frontend consume la API del backend.
2. El backend valida datos, aplica reglas de negocio y consulta PostgreSQL.
3. Las rutas del backend delegan en controllers, services y repositories.
4. El frontend organiza pantallas y componentes por feature.
5. Los cambios de esquema se aplican por migraciones SQL.

## Observacion

Este documento resume la estructura visible en el repositorio y las metodologias ya reflejadas en sus carpetas y archivos actuales. Si el proyecto crece, conviene mantener esta documentacion actualizada junto con nuevos modulos o reglas de arquitectura.
