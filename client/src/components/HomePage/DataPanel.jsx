function DataPanel(props) {
  // eslint-disable-next-line react/prop-types
  const { title, value, unit } = props;
  return (
    <div className="bg-white shadow-md shadow-gray-400 flex flex-col items-center justify-center rounded-md p-2">
      <p className="text-sm">{title}</p>
      <p className="text-sm font-bold">
        {value} {unit}
      </p>
      <a href="#" className="text-sm text-gray-400 hover:underline hover:text-blue-500">
        anos anteriores
      </a>
    </div>
  );
}

export default DataPanel;
