// Importamos Router desde Express.
// Router permite modularizar las rutas por feature
// y mantener el archivo principal de la app limpio.
import { Router } from "express";


// Importamos el controlador de usuarios.
// El router nunca implementa lógica,
// solo delega la ejecución al controller.
import { userController } from "./user.controller.js";


// Creamos una instancia del router de Express
const router = Router();


// Definimos la ruta para crear un usuario
// POST /users
// Cuando se recibe una petición POST en la raíz del recurso,
// Express ejecuta el método create del controller.
router.post("/", userController.create);


// Definimos la ruta para obtener un usuario por id
// GET /users/:id
// Se usa para precargar el formulario de edicion con los datos actuales.
router.get("/:id", userController.getById);


// Definimos la ruta para actualizar un usuario existente
// PUT /users/:id
router.put("/:id", userController.update);


// Exportamos el router para ser registrado en la aplicación principal
// (ej: app.use("/users", router))
export default router;
