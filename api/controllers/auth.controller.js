import { pool } from "../config/db.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

// função de login
export async function Login(req, res) {
  const { email, pass } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM Users WHERE email = $1 AND password = $2",
      [email, pass]
    );

    if (result.rows.length === 0) {
      throw new Error("Email ou senha incorretos");
    }

    const user = result.rows[0];
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "12h" });
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

export async function VerifyAuth(req, res) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token não fornecido" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json(decoded);
  } catch (err) {
    res
      .status(403)
      .json({ message: "Token inválido ou expirado", error: err.message });
  }
}
