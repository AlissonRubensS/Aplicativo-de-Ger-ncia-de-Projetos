import NavBar from "../Ui/NavBar";
import SearchBar from "../Ui/SearchBar";
import EmployeeFramework from "../Ui/EmployeeFramework";
import RegisterEmployeeModal from "../Ui/RegisterEmployeeModal";

import { useState, useEffect } from "react";
import { listEmployees } from "@services/EmployeesService";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchEmployees = async () => {
    try {
      const data = await listEmployees(1);
      data ? setEmployees(data) : null;
    } catch (error) {
      console.error("Falha ao buscar funcionários:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <RegisterEmployeeModal
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        onEmployeeChanged={listEmployees}
      />

      <div className="w-screen h-screen bg-slate-200 flex flex-col space-y-4">
        <NavBar />
        <SearchBar
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          employees={employees}
          setEmployees={setEmployees}
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
    </>
  );
}
