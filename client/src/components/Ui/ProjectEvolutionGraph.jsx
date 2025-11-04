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
      toolbar: { show: true },
      zoom: { enabled: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
      },
    },
    xaxis: {
      categories: categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { fontSize: "12px" } },
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: "right",
      fontSize: "12px",
      markers: { radius: 5 },
      offsetY: 30,
      offsetX: 20,
    },
    grid: {
      borderColor: "tranparent",
    },
    dataLabels: {
      enabled: true,
      style: { fontSize: "12px", colors: ["#000"] },
      formatter: (val) => val,
    },
    colors: ["#5EED9A", "#F3F4F7"],
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
      height="100%"
      width="100%"
    />
  );
};

export default ProjectStatusStackedChart;
