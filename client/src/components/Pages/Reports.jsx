import NavBar from "../Ui/NavBar";
import CascadeTable from "../Ui/CascadeTable";
import InfoCard from "../Ui/InfoCard";
import SelectMenu from "../Ui/SelectMenu";
import { useState, useEffect } from "react";
import { listProjects } from "@services/ProjectService.js";
import { VwEquipmentDetailsByUser } from "@services/ViewService";
import { VerifyAuth } from "@services/AuthService.js";

export default function Reports() {
  const headersTableProjects = ["Projetos", "Valor"];
  const valuesTableProjects = {
    "Projeto 3": [
      ["Peça 1", 30, 20, 15],
      ["Peça 2", 22, 7, 35],
    ],
    "Projeto 4": [
      ["Peça 3", 10, 5, 2],
      ["Peça 4", 8, 3, 1],
    ],
  };
  const filtrosTableProjects = ["filtro 1", "filtro 2", "filtro 3"];
  const headerTableOffices = ["Setor", "Processos"];
  const valuesTableOffices = {
    "Setor 1": [
      ["Processo 1", 10],
      ["Processo 2", 20],
      ["Processo 3", 10],
    ],
    "Setor 2": [
      ["Processo 1", 10],
      ["Processo 2", 20],
      ["Processo 3", 10],
    ],
  };

  // lista os projetos que o usuário está cadastrado
  const [projects, setProjects] = useState([]);
  const [selectedProj, setSelectedProj] = useState([]);

  const fetchProjects = async (user_id) => {
    try {
      const data = await listProjects(user_id);
      if (data && Array.isArray(data)) {
        const projectsNames = data.map((p) => p.project_name);
        setProjects(projectsNames);
      }
    } catch (error) {
      console.error("Error ao listar projetos", error);
    }
  };

  const [equipaments, setEquipaments] = useState([]);
  const [selectedEquip, setSelectedEquip] = useState([]);

  const fetchEquipamentDetails = async (user_id) => {
    try {
      const data = await VwEquipmentDetailsByUser(user_id);
      if (data && Array.isArray(data)) {
        const equipamentsNames = data.map((e) => e.equipment_name);
        setEquipaments(equipamentsNames);
      }
    } catch (error) {
      console.error("Error ao listar equipamento", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      const user = await VerifyAuth();
      await fetchProjects(user.user_id);
      await fetchEquipamentDetails(user.user_id);
    }

    loadData();
  }, []);

  return (
    <>
      <div className="space-y-4 pb-16">
        <NavBar />

        {/* Título da Página */}
        <div className="flex flex-row bg-white py-1 px-2 items-center justify-between shadow-lg mx-4 rounded">
          <h2 className="font-bold text-lg">Dashboard</h2>
          <div className="flex flex-row space-x-2 text-sm">
            <div>
              <p className="text-xs">Projetos</p>
              <SelectMenu
                className="text-sm h-6"
                maxSelections={1}
                options={projects}
                selectedOption={selectedProj}
                setSelectedOption={setSelectedProj}
              />
            </div>
            <div>
              <p className="text-xs">Equipamento</p>
              <SelectMenu
                className="text-sm h-6"
                options={equipaments}
                selectedOption={selectedEquip}
                setSelectedOption={setSelectedEquip}
              />
            </div>
            <div className="flex flex-col">
              <p className="self-center text-xs">Período</p>
              <div className="flex flex-row space-x-2">
                <input
                  type="date"
                  name="date-in"
                  id="date-in"
                  className="bg-gray-50 p-1 rounded-md w-full text-xs"
                />
                <input
                  type="date"
                  name="date-out"
                  id="date-out"
                  className="bg-gray-50 p-1 rounded-md w-full text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 mx-4">
          {/* Info Cards */}
          <div className="col-span-7 bg-white py-1 px-2 rounded shadow-lg">
            <div className="flex flex-col space-y-8 w-1/6 py-1">
              <InfoCard
                title="Entregues"
                value={50}
                icon={<img src="src/imgs/entrega.png" className="w-6 h-6" />}
              />
              <InfoCard
                title="Peças Pendentes"
                value={50}
                icon={<img src="src/imgs/caixa.png" className="w-6 h-6" />}
              />
              <InfoCard
                title="Desperdício"
                value={50}
                icon={
                  <img src="src/imgs/desperdicio.png" className="w-6 h-6" />
                }
              />
            </div>
          </div>

          {/* CascadeTable */}
          <div className="col-span-5 h-96 bg-white py-1 px-2 rounded shadow-lg overflow-auto">
            <CascadeTable
              title="Detalhamento de Materiais por Projetos"
              headers={headersTableProjects}
              values={valuesTableProjects}
              filter={filtrosTableProjects}
            />
          </div>

          {/* Outros cards */}
          <div className="bg-white py-1 px-2 rounded shadow-lg col-span-4 text-sm">
            <h1>Comsumo Total</h1>
          </div>
          <div className="bg-white py-1 px-2 rounded shadow-lg col-span-4 text-sm">
            <h1>Lead Time Meta X Real</h1>
          </div>
          <div className="bg-white py-1 px-2 rounded shadow-lg col-span-4 text-sm h-72 overflow-y-auto">
            <CascadeTable
              title="Processor em Atraso por Setor"
              headers={headerTableOffices}
              values={valuesTableOffices}
              filter={["Dias Em Atraso"]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
