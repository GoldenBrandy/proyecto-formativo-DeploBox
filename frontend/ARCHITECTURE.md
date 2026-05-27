# Arquitectura del frontend

El proyecto se organiza por responsabilidad para que pueda crecer sin mezclar vistas, datos, componentes compartidos y reglas de negocio.

```txt
src/
  app/          Configuracion de React, rutas y proveedores globales.
  assets/       Imagenes, iconos y recursos estaticos importados por Vite.
  features/     Modulos por dominio: auth, users, home, products, etc.
  shared/       UI reutilizable, layouts, schemas y utilidades transversales.
  styles/       Tokens, variables semanticas y estilos globales.
```

## Features

Cada feature debe agrupar lo que le pertenece:

```txt
features/example/
  components/   Componentes internos de la feature.
  data/         Mocks o datos estaticos propios de la feature.
  pages/        Pantallas conectadas a rutas.
  schemas/      Validaciones y contratos.
  services/     Acceso a datos o APIs.
  index.js      API publica de la feature.
```

## Shared

`shared/ui` contiene componentes reutilizables sin conocimiento del dominio.  
`shared/layouts` contiene estructuras de pagina.  
`shared/index.js` es el punto de entrada publico para imports como `@/shared`.

## BEM

Cuando se creen clases CSS propias, usar metodologia BEM:

```css
.user-form {}
.user-form__field {}
.user-form__field--error {}
```

Las clases utilitarias de Tailwind pueden coexistir con BEM, pero las clases semanticas del proyecto deben seguir el formato `bloque__elemento--modificador`.
