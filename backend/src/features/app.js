// Importamos Express, el framework base para construir el servidor HTTP
import express from "express";

// Importamos el middleware CORS
// Permite controlar quÃ© orÃ­genes pueden comunicarse con el backend
import cors from "cors";

// Importamos las rutas del feature users
// Cada feature expone su propio router independiente
import userRoutes from "./users/user.routes.js";
import authRoutes from "./auth/auth.routes.js";
import accessRoutes from "./access/access.routes.js";
import groupRoutes from "./groups/groups.router.js";
import permissionRoutes from "./permissions/permissions.router.js";

// Creamos la instancia principal de la aplicaciÃ³n Express
const app = express();

// Middleware de CORS
// Permitimos solicitudes desde los puertos de desarrollo comunes (Vite)
// Allow common Vite localhost ports during development, or any localhost origin
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
];
const localhostRegex = /^https?:\/\/localhost(?::\d+)?$/;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || localhostRegex.test(origin))
        return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
  }),
);

// Middleware para parsear cuerpos de peticiÃ³n en formato JSON
// Sin este middleware, req.body serÃ­a undefined
app.use(express.json());

// Registro del router de usuarios
// Todas las rutas del feature users quedarán bajo el prefijo /api/users
// Ejemplo final: POST http://localhost:4000/api/users
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/access", accessRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/permissions", permissionRoutes);
// Exportamos la aplicaciÃ³n configurada
// El arranque del servidor se hace en server.js
export default app;
