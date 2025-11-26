import NavBar from "../../Ui/NavBar";
import BudgetsList from "./BudgetsList";
import AddBudgetModal from "./AddBudgetModal";

import { listBudgets } from "@services/BudgetService.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Budgets() {
  const [budgets, setBudgets] = useState([]); // inicial vazio
  const [isAddBudgetModalOpen, setAddBudgetModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBudgets() {
      const data = await listBudgets(1); //valor temporário
      if (data) {
        setBudgets(data);
      }
    }
    fetchBudgets();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full h-screen overflow-y-auto">
        <NavBar />

        <div className="flex flex-row justify-between items-center bg-white px-4 py-2 ml-4 mt-4 mr-4 rounded shadow">
          <h1>Orçamento</h1>
          <button
            className="px-4 py-1 rounded bg-gray-100 hover:bg-gray-200"
            onClick={() => navigate("/projects")}
          >
            Ir para Projetos
          </button>
        </div>

        <div className="flex flex-row">
          <div className="flex flex-col p-4 h-screen space-y-4">
            <BudgetsList
              budgets={budgets}
              setOpen={setAddBudgetModalOpen}
              currentBudget={selectedBudget}
              setCurrentBudget={setSelectedBudget}
            />

            <div className="bg-white rounded-sm shadow p-1  ">
              <button>Aprovar Orçamento</button>
            </div>
          </div>
          <div className="flex flex-col w-full h-full m-4 pb-4 space-y-8">
            <div className="bg-white rounded shadow-sm p-4">
              {selectedBudget ? (
                <>
                  <p>ID: {selectedBudget.id}</p>
                  <p>Nome: {selectedBudget.name}</p>
                  <p>Status: {selectedBudget.status}</p>
                </>
              ) : (
                <p>Nenhum orçamento selecionado</p>
              )}
            </div>

            <div className="bg-white rounded shadow-sm p-4 h-full">
              <h1>aqui vai ter a tabela</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Adicionar Orçamento */}
      {isAddBudgetModalOpen && (
        <AddBudgetModal
          isOpen={isAddBudgetModalOpen}
          setOpen={setAddBudgetModalOpen}
        />
      )}
    </>
  );
}

export default Budgets;
