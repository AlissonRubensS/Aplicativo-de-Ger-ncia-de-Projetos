import { useState } from "react";
import { LoginService } from "../../../services/LoginService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await LoginService(email, password);
      alert("Login bem-sucedido:", response);
      // Redirecionar ou atualizar o estado do aplicativo conforme necessário
    } catch (error) {
      alert("Falha no login. Verifique suas credenciais.");
      console.error("Erro no login:", error);
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
        <form className="flex flex-col min-w-80" onSubmit={handleLogin}>
          <label className="mb-2">Email:</label>
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2 mb-4 shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
