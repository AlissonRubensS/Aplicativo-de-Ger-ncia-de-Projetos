/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";
import axios from "axios";

// import icones
import { FaUserCircle } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { CiBadgeDollar } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa";
import { BsBarChartLine } from "react-icons/bs";

// importando componentes
import EditEmployeeModal from "./EditEmployeeModal";

export default function EmployeeFramework(props) {
  const {
    user_id,
    employee_name,
    employee_office,
    employee_pay,
    employee_absences,
    employee_overtime,
    employee_performance,
    onEmployeeChanged,
  } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [name, setName] = useState(employee_name);
  const [office, setOffice] = useState(employee_office);
  const [pay, setPay] = useState(employee_pay);
  const [absences, setAbsences] = useState(employee_absences);
  const [overtime, setOvertime] = useState(employee_overtime);
  const [performance, setPerformance] = useState(employee_performance);

  const deleteEmployee = async () => {
    //implementar
  };

  return (
    // cartão
    <>
      <EditEmployeeModal
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        user_id={user_id}
      />

      <div className="flex flex-col h-fit w-1/4 p-2 justify-items-center align-self-middle bg-white shadow-md shadow-slate-400 rounded-md">
        {/* cartão */}
        <div className="flex flex-row justify-items-center">
          <FaUserCircle size={50} />
          <div className="flex flex-col ml-2 justify-start">
            <p className="font-medium text-base	flex flex-col ml-2 justify-center">
              {name}
            </p>
            <div className="flex flex-row items-center space-x-1">
              <FaRegAddressCard />
              <p className="text-sm">{office}</p>
            </div>
          </div>
          <button
            className="flex flex-row space-x-px items-center justify-items-center align-self-end ml-auto hover:bg-slate-200 rounded-sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <FaAngleUp size={15} /> : <FaAngleDown size={15} />}
          </button>
        </div>

        {/* cartão expandido */}
        {isExpanded ? (
          <div className="flex flex-col mt-2 text-lg space-y-4 ml-2 font-normal">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-row items-center space-x-1">
                <CiBadgeDollar />
                <p className="text-sm">Salário: R$ {pay}</p>
              </div>
              <div className="flex flex-row items-center space-x-1">
                <CiCalendar />
                <p className="text-sm">Total de Faltas: {absences || "0"}</p>
              </div>
              <div className="flex flex-row items-center space-x-1">
                <BsBarChartLine />
                <p className="text-sm">
                  Desempenho: {performance * 100 || "100"}%
                </p>
              </div>
              <div className="flex flex-row items-center space-x-1">
                <IoTimeOutline />
                <p className="text-sm">Horas Extras: {overtime || "0"}</p>
              </div>
            </div>
            <div className="flex flex-row space-x-4">
              {/* editar funcionário */}
              <button
                className="text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 p-1 rounded w-full"
                onClick={() => setIsModalVisible(true)}
              >
                <FaUserEdit className="inline-block mr-1" />
                Editar
              </button>

              {/* remover funcionário */}
              <button
                className="text-sm font-semibold bg-red-500 text-white hover:bg-red-600 p-1 rounded w-full"
                onClick={async () => {
                  const confirm = window.confirm(
                    "Tem certeza que quer excluir o funcionário?"
                  );
                  if (confirm) {
                    await deleteEmployee();
                    onEmployeeChanged();
                  }
                }}
              >
                <FaTrash className="inline-block mr-1" />
                Remover
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
