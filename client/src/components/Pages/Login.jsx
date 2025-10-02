import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email: username,
        pass: password,
      });
      console.log("Resposta do servidor:", response.data);
      if (response.data.token) {
        sessionStorage.setItem("loginPermission", response.data.token);
        navigate("/home");
      } else {
        alert("Login ou senha inválidos");
      }
      window.location.reload();
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-200 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-white shadow-xl rounded-lg p-6 w-256 h-265">
        <img
          src="src/imgs/tecnosan-logo-circular.png"
          alt="Logo"
          className="mb-4 mx-30"
          width={150}
        />
        <h1 className="text-2xl font-bold mb-4">
          Sistema de Controle de Produção
        </h1>
        <form className="flex flex-col min-w-80" onSubmit={handleSubmit}>
          <label className="mb-2">Usuário:</label>
          <input
            type="text"
            placeholder="Usuário"
            className="border border-gray-300 rounded-md p-2 mb-4 shadow-sm"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="mb-2">Senha:</label>
          <input
            type="password"
            placeholder="Senha"
            className="border border-gray-300 rounded-md p-2 mb-4 shadow-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#" className="text-sm text-blue-500 hover:underline mb-4">
            Esqueceu a senha?
          </a>
          <button
            type="submit"
            className="bg-gradient-to-r from-sky-500 to-indigo-800 text-white rounded-md p-2 shadow-sm"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
