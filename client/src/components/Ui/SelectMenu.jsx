import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoChevronDownSharp } from "react-icons/io5";

function SelectMenu({
  variant = "small",
  maxSelections = 0,
  options = [],
  selectedOption = [],
  setSelectedOption,
}) {
  const [isOpen, setOpen] = useState(false);
  const containerWidth = variant === "full" ? "w-full" : "w-48";

  return (
    <div className={`relative ${containerWidth} `}>
      {/* Botão sempre w-full pra preencher o container */}
      <button
        type="button"
        className="flex items-center justify-between bg-gray-50 p-1 rounded-md w-full text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="truncate">
          {selectedOption.length === 0
            ? "Selecione uma opção"
            : selectedOption.length === 1
            ? selectedOption[0]
            : `${selectedOption.length} opções selecionadas`}
        </span>
        <IoChevronDownSharp className="text-gray-500 shrink-0" />
      </button>

      {/* Dropdown: iguala a largura do CONTAINER (left-0 right-0) */}
      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-white p-1 shadow-md rounded-md z-50
                     max-h-56 overflow-auto text-gray-700"
        >
          {selectedOption.length > 1 && (
            <button
              className="w-full text-left hover:bg-slate-200 p-1 rounded-md text-sm"
              onClick={() => {
                setSelectedOption([]);
                setOpen(false);
              }}
            >
              Limpar Seleção
            </button>
          )}

          {options.map((o) => {
            const checked = selectedOption.includes(o.department_name);
            return (
              <button
                key={o}
                className="w-full flex items-center gap-2 text-left hover:bg-slate-200 p-1 rounded-md"
                onClick={() => {
                  setSelectedOption((prev) => {
                    // se já estiver selecionado, remove
                    if (prev.includes(o.department_name))
                      return prev.filter((x) => x !== o.department_name);

                    // se maxSelections > 0 e já atingiu o limite, não adiciona
                    if (maxSelections && maxSelections == 1) {
                      return [o.department_name];
                    } else if (
                      maxSelections &&
                      maxSelections > 1 &&
                      prev.length >= maxSelections
                    ) {
                      return prev;
                    } else {
                      // caso normal, adiciona
                      return [...prev, o.department_name];
                    }
                  });
                  setOpen(false);
                }}
              >
                {checked ? <FaCheck /> : <span className="w-4" />}
                <span className="truncate">{o.department_name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SelectMenu;
