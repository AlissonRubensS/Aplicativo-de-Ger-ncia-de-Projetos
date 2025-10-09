import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import PropTypes from "prop-types";
import { useState } from "react";
import DepartmentModalEdit from "./DepartmentModalEdit";

function DepartmentCard({ name }) {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <DepartmentModalEdit visible={isModalOpen} setVisible={setModalOpen} />

      <div className="flex flex-col justify-items-center align-self-middle p-4 bg-white shadow-md shadow-slate-400 rounded-md w-full">
        <div className="flex flex-row justify-between px-4">
          <p className="font-medium text-base	flex flex-col ml-2 justify-center">
            {name}
          </p>
          <div className="flex space-x-4">
            <button onClick={() => setModalOpen(!isModalOpen)}>
              <MdEdit size={20} />
            </button>
            <button>
              <FaTrash size={15} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

DepartmentCard.propTypes = {
  name: PropTypes.string.isRequired,
};

export default DepartmentCard;
