import Chart from "react-apexcharts";

const ProjectStatusStackedChart = ({ data = [] }) => {
  // Protege caso data seja vazio
  if (!data.length) {
    return <p>Carregando dados...</p>;
  }
  const categories = [...new Set(data.map((d) => d.equipment_name))];
  const statuses = [...new Set(data.map((d) => d.status))];
  const series = statuses.map((status) => ({
    name: status,
    data: categories.map((cat) => {
      const item = data.find(
        (d) => d.equipment_name === cat && d.status === status
      );
      return item ? Number(item.numero_pecas) : 0;
    }),
  }));

  const options = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: 6,
      },
    },
    xaxis: {
      categories: categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { fontSize: "12px" } },
    },
    yaxis: {
      title: { text: "Número de Componentes", style: { fontSize: "12px" } },
      labels: { style: { fontSize: "12px" } },
    },
    legend: {
      position: "right",
      fontSize: "12px",
      markers: { radius: 5 },
      offsetY: 0,
    },
    grid: {
      borderColor: "#eee",
      row: { colors: ["transparent"], opacity: 0.5 },
    },
    dataLabels: {
      enabled: true,
      style: { fontSize: "10px", colors: ["#fff"] },
      formatter: (val) => val,
    },
    colors: ["#4CAF50", "#F44336", "#FFC107", "#2196F3"], // cores por status
    tooltip: {
      y: {
        formatter: (val) => `${val} componentes`,
      },
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={350}
      width={700}
    />
  );
};

export default ProjectStatusStackedChart;
