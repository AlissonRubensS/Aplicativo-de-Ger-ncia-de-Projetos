import axios from "axios";

export async function LoginService(email, pass) {
  try {
    const response = await axios.post("http://localhost:3001/auth/login", {
      email,
      pass,
    });
    const TOKEN = response.data.token;
    localStorage.setItem("token", TOKEN);
    return TOKEN;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
}
