import { useState } from "react";
import Chart from "react-apexcharts";

const TotalConsumptionGraph = ({ data = [] }) => {
  const [mode, setMode] = useState("kg");

  if (!data.length) {
    return <p>Carregando dados...</p>;
  }

  const projects = [...new Set(data.map((d) => d.project_name))];
  const materials = [...new Set(data.map((d) => d.material_name))];

  // Altura dinâmica (50px por projeto, mínimo de 250px)
  const chartHeight = Math.max(250, projects.length * 50);

  const series = materials.map((material) => ({
    name: material,
    data: projects.map((project) => {
      const item = data.find(
        (d) => d.project_name === project && d.material_name === material
      );
      return item
        ? mode === "kg"
          ? Number(item.total_material_consumed)
          : Number(item.total_value)
        : 0;
    }),
  }));

  const options = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: true },
      zoom: {
        enabled: true,
        type: 'xy' // <-- MUDANÇA 1: Habilita o zoom por seleção em X e Y
      },
    },
    plotOptions: {
      bar: {
        horizontal: true, 
        columnWidth: "40%",
        borderRadius: 4,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '11px',
              fontWeight: 600,
              color: '#333'
            },
            formatter: (val) => {
              if (val < 1) return "";
              return mode === "kg"
                ? `${val.toFixed(0)} kg`
                : `R$ ${val.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
            }
          }
        }
      },
    },
    xaxis: {
      labels: {
        style: { fontSize: "11px", colors: "#333" },
        formatter: (val) => {
          if (val < 1) return val.toFixed(0);
          return mode === "kg"
            ? `${val.toFixed(0)}`
            : `R$ ${val.toLocaleString("pt-BR")}`;
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      categories: projects,
      labels: { style: { fontSize: "11px", colors: "#333" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontSize: "11px",
      markers: { radius: 4 },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#4B0082", "#6495ED", "#32CD32", "#87CEFA", "#9370DB"], 
    tooltip: {
      y: {
        formatter: (val) =>
          mode === "kg"
            ? `${val.toFixed(0)} kg`
            : `R$ ${val.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 } )}`,
      },
    },
    grid: { borderColor: "transparent" },
  };

  return (
    <div className="p-3 bg-white rounded-2xl shadow-sm h-full w-full flex flex-col">
      {/* Título e Botões (seção fixa) */}
      <div className="flex items-center gap-2 mb-3 text-sm font-medium">
        <span>Consumo Total</span>
        <div className="flex gap-1 ml-2 border rounded-lg overflow-hidden">
          <button
            onClick={() => setMode("kg")}
            className={`px-3 py-1 transition ${
              mode === "kg" ? "bg-gray-200 text-black" : "text-gray-400"
            }`}
          >
            Quantidade
          </button>
          <button
            onClick={() => setMode("reais")}
            className={`px-3 py-1 transition ${
              mode === "reais" ? "bg-gray-200 text-black" : "text-gray-400"
            }`}
          >
            Reais
          </button>
        </div>
      </div>

      {/* <-- MUDANÇA 2: Container com scroll Y e X */}
      <div className="flex-1 overflow-y-auto overflow-x-auto">
        
        {/* <-- MUDANÇA 3: Wrapper interno com altura dinâmica e LARGURA MÍNIMA */}
        <div style={{ minWidth: '600px', height: chartHeight }}>
          <Chart
            options={options}
            series={series}
            type="bar"
            height="100%" // <-- MUDANÇA 4: Preenche o wrapper
            width="100%"  // <-- MUDANÇA 5: Preenche o wrapper
          />
        </div>
      </div>
    </div>
  );
};

export default TotalConsumptionGraph;