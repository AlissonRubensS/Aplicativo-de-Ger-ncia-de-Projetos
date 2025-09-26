import { pool } from "../config/db.js";
import jwt from "jsonwebtoken";

const secret = "tecnosanapp.29.08.2025.C#4V3_S3CR3T4";

//Login
export const Login = async (req, res) => {
  try {
    const email = req.body.email?.trim();
    const pass = req.body.pass?.trim();
    if (!email || !pass) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }
    const response = await pool.query(
      "SELECT * FROM Users WHERE email = $1 AND pass = $2",
      [email, pass]
    );
    if (response.rows.length === 0) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }
    const user = response.rows[0];
    if (user.email !== email || user.pass !== pass) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }
    const token = jwt.sign({ user_id: user.user_id }, secret, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar dados" });
  }
};

// Usuário conectado

export const Me = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "Token não informado" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret);
    res.json({ user_id: decoded.user_id });
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};
