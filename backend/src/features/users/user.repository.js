// Importamos el pool de conexión a PostgreSQL.
// Este pool es una instancia compartida configurada en la capa de infraestructura.
import { pool } from "../../config/db.js";


// Exportamos el repositorio de usuarios.
// El repository encapsula todas las consultas SQL relacionadas con users.
export const userRepository = {


  // Método encargado de crear un usuario en la base de datos
  // Recibe un objeto con los datos ya validados y procesados por el service
  async create(userData) {


    // Desestructuramos explícitamente las propiedades esperadas
    // Esto hace el contrato de datos claro y evita acceder a propiedades inexistentes
    const {
      name,
      middleName,
      lastName1,
      lastName2,
      userEmail,
      institutionalEmail,
      phone,
      documentType,
      documentNumber,
      groupId,
      address,
      startDate,
      endDate,
      userPassword,
      avatarUrl,
      isStaff,
      isActive,
      isSuperUser,
    } = userData;


    // Definimos la consulta SQL parametrizada
    // Usar placeholders ($1, $2, ...) previene inyecciones SQL
    // RETURNING permite obtener datos generados por la base de datos (id)
    const query = `
      INSERT INTO users (
        user_name,
        middle_name,
        last_name_1,
        last_name_2,
        user_email,
        institutional_email,
        user_phone,
        document_type,
        document_number,
        group_id,
        address,
        start_date,
        end_date,
        password,
        avatar_url,
        is_staff,
        is_active,
        is_superuser
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
      RETURNING id;
    `;


    // Array de valores que se pasan al query
    // El orden debe coincidir EXACTAMENTE con los placeholders del SQL
    const values = [
      name,
      middleName || null,
      lastName1 || null,
      lastName2 || null,
      userEmail,
      institutionalEmail || null,
      phone,
      documentType,
      documentNumber,
      groupId || null,
      address || null,
      startDate || null,
      endDate || null,
      userPassword,
      avatarUrl,
      isStaff,
      isActive,
      isSuperUser,
    ];


    // Ejecutamos la consulta usando el pool
    // pool.query retorna un objeto con metadata y filas resultantes
    const result = await pool.query(query, values);


    // Devolvemos únicamente el primer registro retornado
    // En este caso contiene el id del usuario recién creado
    return result.rows[0];
  },


  // Busca un usuario por su id para precargar el formulario de edicion.
  // No devuelve la contrasena por seguridad.
  async findById(id) {
    const query = `
      SELECT
        id,
        user_name,
        middle_name,
        last_name_1,
        last_name_2,
        user_email,
        institutional_email,
        user_phone,
        document_type,
        document_number,
        group_id,
        address,
        start_date,
        end_date,
        avatar_url,
        is_staff,
        is_active,
        is_superuser
      FROM users
      WHERE id = $1;
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0] ?? null;
  },


  // Actualiza los datos de un usuario existente.
  // La contrasena es opcional: solo se actualiza si se envia un hash nuevo.
  async update(id, userData) {
    const {
      name,
      middleName,
      lastName1,
      lastName2,
      userEmail,
      institutionalEmail,
      phone,
      documentType,
      documentNumber,
      groupId,
      address,
      startDate,
      endDate,
      userPassword,
      isActive,
    } = userData;

    const baseQuery = `
      UPDATE users SET
        user_name = $1,
        middle_name = $2,
        last_name_1 = $3,
        last_name_2 = $4,
        user_email = $5,
        institutional_email = $6,
        user_phone = $7,
        document_type = $8,
        document_number = $9,
        group_id = $10,
        address = $11,
        start_date = $12,
        end_date = $13,
        is_active = $14
    `;

    const baseValues = [
      name,
      middleName || null,
      lastName1 || null,
      lastName2 || null,
      userEmail,
      institutionalEmail || null,
      phone,
      documentType,
      documentNumber,
      groupId || null,
      address || null,
      startDate || null,
      endDate || null,
      isActive,
    ];

    // Si se envio una contrasena nueva, se agrega a la consulta.
    // Si no, la contrasena guardada se mantiene intacta.
    const query = userPassword
      ? `${baseQuery}, password = $15 WHERE id = $16 RETURNING id;`
      : `${baseQuery} WHERE id = $15 RETURNING id;`;

    const values = userPassword
      ? [...baseValues, userPassword, id]
      : [...baseValues, id];

    const result = await pool.query(query, values);
    return result.rows[0] ?? null;
  },
};
