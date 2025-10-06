import { pool } from "../config/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// função de login
export async function Login(req, res) {
  const { email, pass } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM Users WHERE email = $1 AND pass = $2",
      [email, pass]
    );

    if (result.rows.length === 0) {
      throw new Error("Email ou senha incorretos");
    }

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "12h" });
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}