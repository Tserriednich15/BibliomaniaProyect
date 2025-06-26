import connection from "../utils/db.js";
class Rol {
  static async findAll() {
    const [rows] = await connection.query("SELECT * FROM roles ORDER BY id ASC");
    return rows;
  }
}
export default Rol;