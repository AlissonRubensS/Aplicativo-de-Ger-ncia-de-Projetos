import NavBar from "../Ui/NavBar";
import SearchBar from "../Ui/SearchBar";
import EmployeeFramework from "../Ui/EmployeeFramework";
import RegisterEmployeeModal from "../Ui/RegisterEmployeeModal";
import DepartmentCard from "../Ui/DepartmentCard";
import DepartmentModalRegister from "../Ui/DepartmentModalRegister";
import { useState, useEffect } from "react";
import { listEmployees } from "@services/EmployeesService";
import { listDepartments } from "@services/DepartmentService";

export default function Employees() {
  // Funcionários Lógica
  const [employees, setEmployees] = useState([]);
  const [isAddEmployeeModal, setAddEmployeeModal] = useState(false);
  const [isAddDepModal, setAddDepModal] = useState(false);

  const fetchEmployees = async () => {
    try {
      const data = await listEmployees(1);
      data ? setEmployees(data) : null;
    } catch (error) {
      console.error("Falha ao buscar funcionários:", error);
    }
  };

  // Departamento Lógica
  const [departments, setDepatments] = useState([]);

  const fetchDepartments = async () => {
    const data = await listDepartments();
    data ? setDepatments(data) : null;
  };

  // fetchs
  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);
  return (
    <>
      <RegisterEmployeeModal
        visible={isAddEmployeeModal}
        setVisible={setAddEmployeeModal}
        onEmployeeChanged={listEmployees}
      />

      <DepartmentModalRegister
        visible={isAddDepModal}
        setVisible={setAddDepModal}
      />

      <div className="flex flex-col w-screen h-screen space-y-4 overflow-x-hidden">
        <NavBar />
        <div className="bg-slate-200 flex flex-row items-start w-screen h-screen">
          <div className="flex flex-col w-4/6 space-y-4 p-4">
            <SearchBar
              isModalVisible={isAddEmployeeModal}
              setIsModalVisible={setAddEmployeeModal}
              list={employees}
              setList={setEmployees}
            />
            <div className="flex flex-wrap justify-center gap-4 pb-16">
              {employees.map((employee) => (
                <EmployeeFramework
                  key={employee.user_id}
                  user_id={employee.user_id}
                  employee_name={employee.user_name}
                  employee_office={employee.job_title}
                  employee_pay={employee.salary}
                  employee_absences={0}
                  employee_overtime={0}
                  employee_performance={employee.performance}
                  onEmployeeChanged={listEmployees}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 p-4">
            <SearchBar
              isModalVisible={isAddDepModal}
              setIsModalVisible={setAddDepModal}
              list={departments}
              setList={setDepatments}
            />
            {departments.map((dep) => (
              <DepartmentCard
                key={dep.department_id}
                id={dep.department_id}
                name={dep.department_name}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
