import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Usuario from "../models/usuario.js";
import Rol from "../models/rol.js";
dotenv.config();

const secretKey = process.env.ACCESS_TOKEN_SECRET;
const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET;
const tokenExpiration = process.env.TOKEN_EXPIRATION;
const refreshExpiration = process.env.REFRESH_EXPIRATION;

class AuthService {

  static async register(datos) {
    try {
      const { usuario, contrasena, nombre, apellido, cedula, correo, telefono } = datos;

      const userExists = await Usuario.findByUsername(usuario);
      if (userExists) {
        return {
          error: true,
          code: 409,
          message: "El nombre de usuario ya está registrado",
        };
      }

      const hashedPassword = await bcrypt.hash(contrasena, 10);

      const userId = await Usuario.create({
        usuario,
        contrasena: hashedPassword,
        nombre,
        apellido,
        cedula,
        correo,
        telefono
      });

      return {
        error: false,
        code: 201,
        message: "Usuario registrado exitosamente",
        userId,
      };

    } catch (error) {
      console.error("Error al registrar:", error);
      return {
        error: true,
        code: 500,
        message: "Error interno al registrar el usuario",
      };
    }

  }

  static async login(usuario, contrasena) {
    try {
      const user = await Usuario.findByUsername(usuario);
      if (!user) {
        return { error: true, code: 401, message: "Usuario o contraseña incorrectos" };
      }

      const validPassword = await bcrypt.compare(contrasena, user.contrasena);
      if (!validPassword) {
        return { error: true, code: 401, message: "Usuario o contraseña incorrectos" };
      }

      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);

      await Usuario.updateRefreshToken(user.id, refreshToken);

      return {
        error: false,
        code: 200,
        message: "Inicio de sesión exitoso",
        data: {
          accessToken,
          refreshToken,
          rol: user.rol
        },
      };
    } catch (error) {
      console.error("Error en login:", error);
      return { error: true, code: 500, message: "Error interno al iniciar sesión" };
    }
  }

  static generateAccessToken(user) {
    return jwt.sign(
      {
        id: user.id,
        usuario: user.usuario,
        rol: user.rol
      },
      secretKey,
      { expiresIn: tokenExpiration }
    );
  }



  static generateRefreshToken(user) {
    return jwt.sign(
      {
        id: user.id,
        usuario: user.usuario,
      },
      refreshSecretKey,
      { expiresIn: refreshExpiration }
    );
  }

  static async renewTokens(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, refreshSecretKey);
      const user = await Usuario.findById(decoded.id);

      if (!user || user.refresh_token !== refreshToken) {
        return { error: true, code: 403, message: "Token inválido o expirado" };
      }

      const accessToken = this.generateAccessToken(user);


      const decodedToken = jwt.decode(refreshToken);
      const tiempoRestante = decodedToken.exp - Math.floor(Date.now() / 1000);

      let newRefreshToken = null;
      if (tiempoRestante < 60 * 60 * 24) {
        newRefreshToken = this.generateRefreshToken(user);
        await Usuario.updateRefreshToken(user.id, newRefreshToken);
      }

      return {
        error: false,
        code: 200,
        message: "Token renovado correctamente",
        data: {
          accessToken,
          refreshToken: newRefreshToken || refreshToken,
        },
      };
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return {
          error: true,
          code: 403,
          message: "El token ha expirado. Inicie sesión nuevamente.",
        };
      }

      return { error: true, code: 403, message: "Token inválido o expirado" };
    }
  }

  static async logout(userId) {
    await Usuario.updateRefreshToken(userId, null);
    return {
      error: false,
      code: 200,
      message: "Sesión cerrada correctamente",
    };
  }
}

export default AuthService;