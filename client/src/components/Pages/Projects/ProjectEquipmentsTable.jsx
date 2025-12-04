/* eslint-disable no-unused-vars */
import { useState } from "react";

function ProjectEquipmentsTable({ project_id }) {
  const [isExpandRow, setExpandRow] = useState({});


  return (
    <table className="w-full project-equipments text-center">
      <thead>
        <tr className="text-left bg-[#DBEBFF]">
          <th className="first:rounded-tl-lg" colSpan={2}>
            Equipamentos
          </th>
          <th>Início</th>
          <th>Fim</th>
          <th>Status</th>
          <th>Resina</th>
          <th>Roving</th>
          <th>Tecido KG</th>
          <th>Tec. CMD</th>
          <th>Valor</th>
          <th className="last:rounded-tr-lg">Horas</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-white-gray">
          <th>+</th>
          <th>Equipamento</th>
          <th>DD/MM/AA</th>
          <th>DD/MM/AA</th>
          <th>Status</th>
          <th>XXXX</th>
          <th>XXXX</th>
          <th>XXXX</th>
          <th>XXXX</th>
          <th>XXXX</th>
          <th>XXXX</th>
        </tr>
      </tbody>
    </table>
  );
}

export default ProjectEquipmentsTable;
