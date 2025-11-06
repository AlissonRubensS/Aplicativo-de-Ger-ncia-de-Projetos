import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoChevronDownSharp } from "react-icons/io5";

function SelectMenu({
  variant = "small",
  maxSelections = 0,
  options = [],           // [{ id, label }]
  selectedOption = [],    // [ id ] 
  setSelectedOption,
}) {
  const [isOpen, setOpen] = useState(false);
  const containerWidth = variant === "full" ? "w-full" : "w-48";

  const getLabelById = (id) => {
    const found = options.find((o) => o.id === id);
    return found ? found.label : id;
  };

  return (
    <div className={`relative ${containerWidth}`}>
      {/* Botão */}
      <button
        type="button"
        className="flex items-center justify-between bg-gray-50 p-1 rounded-md w-full text-left"
        onClick={() => setOpen(v => !v)}
      >
        <span className="truncate">
          {selectedOption.length === 0
            ? "Selecione uma opção"
            : selectedOption.length === 1
            ? getLabelById(selectedOption[0])
            : `${selectedOption.length} opções selecionadas`}
        </span>
        <IoChevronDownSharp className="text-gray-500 shrink-0" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white p-1 shadow-md rounded-md z-50 max-h-56 overflow-auto text-gray-700">

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
            const checked = selectedOption.includes(o.id);

            return (
              <button
                key={o.id}
                className="w-full flex items-center gap-2 text-left hover:bg-slate-200 p-1 rounded-md"
                onClick={() => {
                  setSelectedOption(prev => {
                    if (prev.includes(o.id))
                      return prev.filter(x => x !== o.id);

                    if (maxSelections === 1) return [o.id];
                    if (maxSelections > 1 && prev.length >= maxSelections) return prev;

                    return [...prev, o.id];
                  });
                  setOpen(false);
                }}
              >
                {checked ? <FaCheck /> : <span className="w-4" />}
                <span className="truncate">{o.label}</span>
              </button>
            );
          })}

        </div>
      )}
    </div>
  );
}

export default SelectMenu;
